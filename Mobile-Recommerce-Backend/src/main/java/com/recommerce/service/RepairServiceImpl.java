package com.recommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.recommerce.dto.ConfirmBookingRequest;
import com.recommerce.dto.ConfirmBookingResponse;
import com.recommerce.dto.RepairProblemRequest;
import com.recommerce.dto.RepairProblemResponse;
import com.recommerce.repository.AddressRepository;
import com.recommerce.repository.DeviceModelRepository;
import com.recommerce.repository.ConfirmBookingRepository;
import com.recommerce.repository.RepairProblemRepository;
import com.recommerce.repository.UserRepository;
import java.util.ArrayList;
import com.recommerce.model.RepairProblem;
import com.recommerce.model.DeviceModel;
import java.util.NoSuchElementException;

import java.util.UUID;

import com.recommerce.model.ConfirmBooking;
import com.recommerce.model.User;
import java.math.BigDecimal;

import com.recommerce.dto.ConfirmBookingItemResponse;
import com.recommerce.model.ConfirmBookingItem;

@Service
public class RepairServiceImpl implements RepairService {

    private final RepairProblemRepository repairProblemRepository;
    private final ConfirmBookingRepository ConfirmBookingRepository;
    private final DeviceModelRepository deviceModelRepository;
    private final UserRepository userRepository;
    public RepairServiceImpl(
            RepairProblemRepository repairProblemRepository,
            ConfirmBookingRepository ConfirmBookingRepository,
            DeviceModelRepository deviceModelRepository,
            UserRepository userRepository,
            AddressRepository addressRepository) {

        this.repairProblemRepository = repairProblemRepository;
        this.ConfirmBookingRepository = ConfirmBookingRepository;
        this.deviceModelRepository = deviceModelRepository;
        this.userRepository = userRepository;
    }
    
    @Override
    public List<RepairProblemResponse> getProblemsByModel(Long modelId) {

        List<RepairProblem> problems =
                repairProblemRepository.findByModelIdAndActiveTrue(modelId);

        List<RepairProblemResponse> responseList = new ArrayList<>();

        for (RepairProblem problem : problems) {

            RepairProblemResponse response = new RepairProblemResponse();

            response.setId(problem.getId());
            response.setProblemName(problem.getProblemName());
            response.setPrice(problem.getPrice());
            response.setEstimatedTime(problem.getEstimatedTime());
            response.setDescription(problem.getDescription());

            responseList.add(response);
        }

        return responseList;
    }
    
    @Override
    public ConfirmBookingResponse bookRepair(
            ConfirmBookingRequest request,
            String customerEmail) {

        System.out.println("Received customerEmail = " + customerEmail);

        User user = userRepository.findByEmail(customerEmail)
                .orElseThrow(() ->
                        new NoSuchElementException("User not found"));

        DeviceModel model = deviceModelRepository.findById(request.getModelId())
                .orElseThrow(() ->
                        new NoSuchElementException("Device model not found"));


        List<RepairProblem> problems =
                repairProblemRepository.findAllById(request.getServiceIds());

        if (problems.isEmpty()) {
            throw new NoSuchElementException("No repair problems selected");
        }

        ConfirmBooking booking = new ConfirmBooking();

        booking.setBookingNumber(
                "RB" + UUID.randomUUID()
                        .toString()
                        .replace("-", "")
                        .substring(0, 8)
                        .toUpperCase());

        booking.setUser(user);
        booking.setModel(model);

        booking.setCustomerName(request.getCustomerName());
        booking.setPhone(request.getCustomerMobile());
        booking.setPickupDate(request.getAppointmentDate());
        booking.setRemarks(request.getCustomerNotes());

        BigDecimal totalPrice = BigDecimal.ZERO;

        for (RepairProblem problem : problems) {

            ConfirmBookingItem item = new ConfirmBookingItem();

            item.setConfirmBooking(booking);
            item.setRepairProblem(problem);
            item.setPrice(problem.getPrice());

            booking.addBookingItem(item);

            totalPrice = totalPrice.add(problem.getPrice());
        }

        booking.setTotalPrice(totalPrice);
        booking.setBookingStatus("BOOKED");

        ConfirmBooking savedBooking =
                ConfirmBookingRepository.save(booking);

        ConfirmBookingResponse response =
                new ConfirmBookingResponse();

        response.setId(savedBooking.getId());
        response.setBookingNumber(savedBooking.getBookingNumber());
        response.setCustomerName(savedBooking.getCustomerName());
        response.setPhone(savedBooking.getPhone());
        response.setModelName(savedBooking.getModel().getName());
        response.setPickupDate(savedBooking.getPickupDate());
        response.setRemarks(savedBooking.getRemarks());
        response.setTotalPrice(savedBooking.getTotalPrice());
        response.setBookingStatus(savedBooking.getBookingStatus());

        List<ConfirmBookingItemResponse> repairItems =
                new ArrayList<>();

        for (ConfirmBookingItem item : savedBooking.getBookingItems()) {

            ConfirmBookingItemResponse itemResponse =
                    new ConfirmBookingItemResponse();

            itemResponse.setProblemId(
                    item.getRepairProblem().getId());

            itemResponse.setProblemName(
                    item.getRepairProblem().getProblemName());

            itemResponse.setPrice(
                    item.getPrice());

            itemResponse.setEstimatedTime(
                    item.getRepairProblem().getEstimatedTime());

            repairItems.add(itemResponse);
        }

        response.setSelectRepair(repairItems);

        return response;
    }
    
    @Override
    public List<RepairProblemResponse> getAllProblems() {

        return repairProblemRepository
                .findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(problem -> {

                    RepairProblemResponse response =
                            new RepairProblemResponse();

                    response.setId(problem.getId());

                    response.setBrandId(
                            problem.getModel().getBrand().getId());

                    response.setBrandName(
                            problem.getModel().getBrand().getName());

                    response.setModelId(
                            problem.getModel().getId());

                    response.setModelName(
                            problem.getModel().getName());

                    response.setProblemName(problem.getProblemName());
                    response.setCategory(problem.getCategory());
                    response.setPrice(problem.getPrice());
                    response.setEstimatedTime(problem.getEstimatedTime());
                    response.setImageUrl(problem.getImageUrl());
                    response.setDisplayOrder(problem.getDisplayOrder());
                    response.setDescription(problem.getDescription());
                    response.setActive(problem.getActive());

                    return response;

                })
                .toList();
    }
    
    @Override
    public RepairProblemResponse addProblem(RepairProblemRequest request) {

        DeviceModel model = deviceModelRepository.findById(request.getModelId())
                .orElseThrow(() ->
                        new NoSuchElementException("Device model not found"));

        RepairProblem problem = new RepairProblem();

        problem.setModel(model);
        problem.setProblemName(request.getProblemName());
        problem.setCategory(request.getCategory());
        problem.setPrice(request.getPrice());
        problem.setEstimatedTime(request.getEstimatedTime());
        problem.setImageUrl(request.getImageUrl());
        problem.setDisplayOrder(request.getDisplayOrder());
        problem.setDescription(request.getDescription());
        problem.setActive(true);

        RepairProblem savedProblem = repairProblemRepository.save(problem);

        RepairProblemResponse response = new RepairProblemResponse();

        response.setId(savedProblem.getId());

        response.setBrandId(
                savedProblem.getModel().getBrand().getId());

        response.setBrandName(
                savedProblem.getModel().getBrand().getName());

        response.setModelId(
                savedProblem.getModel().getId());

        response.setModelName(
                savedProblem.getModel().getName());

        response.setProblemName(savedProblem.getProblemName());
        response.setCategory(savedProblem.getCategory());
        response.setPrice(savedProblem.getPrice());
        response.setEstimatedTime(savedProblem.getEstimatedTime());
        response.setImageUrl(savedProblem.getImageUrl());
        response.setDisplayOrder(savedProblem.getDisplayOrder());
        response.setDescription(savedProblem.getDescription());
        response.setActive(savedProblem.getActive());

        return response;
    }
    @Override
    public RepairProblemResponse updateProblem(Long id, RepairProblemRequest request) {

        RepairProblem problem = repairProblemRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Repair problem not found"));

        DeviceModel model = deviceModelRepository.findById(request.getModelId())
                .orElseThrow(() ->
                        new NoSuchElementException("Device model not found"));

        problem.setModel(model);
        problem.setProblemName(request.getProblemName());
        problem.setCategory(request.getCategory());
        problem.setPrice(request.getPrice());
        problem.setEstimatedTime(request.getEstimatedTime());
        problem.setImageUrl(request.getImageUrl());
        problem.setDisplayOrder(request.getDisplayOrder());        
        problem.setDescription(request.getDescription());

        RepairProblem updatedProblem = repairProblemRepository.save(problem);

        RepairProblemResponse response = new RepairProblemResponse();

        response.setId(updatedProblem.getId());

        response.setBrandId(
                updatedProblem.getModel().getBrand().getId());

        response.setBrandName(
                updatedProblem.getModel().getBrand().getName());

        response.setModelId(
                updatedProblem.getModel().getId());

        response.setModelName(
                updatedProblem.getModel().getName());

        response.setProblemName(updatedProblem.getProblemName());
        response.setCategory(updatedProblem.getCategory());
        response.setPrice(updatedProblem.getPrice());
        response.setEstimatedTime(updatedProblem.getEstimatedTime());
        response.setImageUrl(updatedProblem.getImageUrl());
        response.setDisplayOrder(updatedProblem.getDisplayOrder());
        response.setDescription(updatedProblem.getDescription());
        response.setActive(updatedProblem.getActive());

        return response;
    }

    @Override
    public void deleteProblem(Long id) {

        RepairProblem problem = repairProblemRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Repair problem not found"));

        problem.setActive(false);

        repairProblemRepository.save(problem);
    }
    
    @Override
    public List<ConfirmBookingResponse> myConfirmBookings(String customerEmail) {

        User user = userRepository.findByEmail(customerEmail)
                .orElseThrow(() ->
                        new NoSuchElementException("User not found"));

        List<ConfirmBooking> bookings =
                ConfirmBookingRepository.findByUserOrderByCreatedAtDesc(user);

        List<ConfirmBookingResponse> responseList =
                new ArrayList<>();

        for (ConfirmBooking booking : bookings) {

            ConfirmBookingResponse response =
                    new ConfirmBookingResponse();

            response.setId(booking.getId());
            response.setBookingNumber(booking.getBookingNumber());
            response.setCustomerName(booking.getCustomerName());
            response.setPhone(booking.getPhone());
            response.setModelName(booking.getModel().getName());
            response.setPickupDate(booking.getPickupDate());
            response.setRemarks(booking.getRemarks());
            response.setTotalPrice(booking.getTotalPrice());
            response.setBookingStatus(booking.getBookingStatus());

            List<ConfirmBookingItemResponse> repairItems =
                    new ArrayList<>();

            for (ConfirmBookingItem item : booking.getBookingItems()) {

                ConfirmBookingItemResponse itemResponse =
                        new ConfirmBookingItemResponse();

                itemResponse.setProblemId(
                        item.getRepairProblem().getId());

                itemResponse.setProblemName(
                        item.getRepairProblem().getProblemName());

                itemResponse.setPrice(
                        item.getPrice());

                itemResponse.setEstimatedTime(
                        item.getRepairProblem().getEstimatedTime());

                repairItems.add(itemResponse);
            }

            response.setSelectRepair(repairItems);

            responseList.add(response);
        }

        return responseList;
    }
    
    @Override
    public List<ConfirmBookingResponse> getAllConfirmBookings() {

        List<ConfirmBooking> bookings =
                ConfirmBookingRepository.findAllByOrderByCreatedAtDesc();

        List<ConfirmBookingResponse> responseList =
                new ArrayList<>();

        for (ConfirmBooking booking : bookings) {

            ConfirmBookingResponse response =
                    new ConfirmBookingResponse();

            response.setId(booking.getId());
            response.setBookingNumber(booking.getBookingNumber());
            response.setCustomerName(booking.getCustomerName());
            response.setPhone(booking.getPhone());
            response.setModelName(booking.getModel().getName());
            response.setPickupDate(booking.getPickupDate());
            response.setRemarks(booking.getRemarks());
            response.setTotalPrice(booking.getTotalPrice());
            response.setBookingStatus(booking.getBookingStatus());

            List<ConfirmBookingItemResponse> repairItems =
                    new ArrayList<>();

            for (ConfirmBookingItem item : booking.getBookingItems()) {

                ConfirmBookingItemResponse itemResponse =
                        new ConfirmBookingItemResponse();

                itemResponse.setProblemId(
                        item.getRepairProblem().getId());

                itemResponse.setProblemName(
                        item.getRepairProblem().getProblemName());

                itemResponse.setPrice(
                        item.getPrice());

                itemResponse.setEstimatedTime(
                        item.getRepairProblem().getEstimatedTime());

                repairItems.add(itemResponse);
            }

            response.setSelectRepair(repairItems);

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public ConfirmBookingResponse updateBookingStatus(Long bookingId, String status) {

        ConfirmBooking booking = ConfirmBookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new NoSuchElementException("Repair booking not found"));

        booking.setBookingStatus(status);

        ConfirmBooking updatedBooking =
                ConfirmBookingRepository.save(booking);

        ConfirmBookingResponse response =
                new ConfirmBookingResponse();

        response.setId(updatedBooking.getId());
        response.setBookingNumber(updatedBooking.getBookingNumber());
        response.setCustomerName(updatedBooking.getCustomerName());
        response.setPhone(updatedBooking.getPhone());
        response.setModelName(updatedBooking.getModel().getName());
        response.setPickupDate(updatedBooking.getPickupDate());
        response.setRemarks(updatedBooking.getRemarks());
        response.setTotalPrice(updatedBooking.getTotalPrice());
        response.setBookingStatus(updatedBooking.getBookingStatus());

        List<ConfirmBookingItemResponse> repairItems =
                new ArrayList<>();

        for (ConfirmBookingItem item : updatedBooking.getBookingItems()) {

            ConfirmBookingItemResponse itemResponse =
                    new ConfirmBookingItemResponse();

            itemResponse.setProblemId(
                    item.getRepairProblem().getId());

            itemResponse.setProblemName(
                    item.getRepairProblem().getProblemName());

            itemResponse.setPrice(
                    item.getPrice());

            itemResponse.setEstimatedTime(
                    item.getRepairProblem().getEstimatedTime());

            repairItems.add(itemResponse);
        }

        response.setSelectRepair(repairItems);

        return response;
    }

}