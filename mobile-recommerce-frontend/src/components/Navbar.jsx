import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    Link,
    NavLink,
    useLocation,
    useNavigate
} from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "./Navbar.css";

function Navbar() {

    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

const categories = [
   
  "Refurbished",
  "Repair Services",  
  "Accessories", 
  "contact",
  "About Us"
];

    const [anchorEl, setAnchorEl] = useState(null);

const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
};

const closeMenu = () => {
    setAnchorEl(null);
};

    const navigate = useNavigate();
    const location = useLocation();

    const isRepairPage =
     location.pathname.startsWith("/repair");


    // ==========================================
    // GET CART COUNT
    // ==========================================

    const updateCartCount = useCallback(
        async () => {

            const token =
                localStorage.getItem("token");

            if (!token) {
                setCartCount(0);
                return;
            }

            try {

                const response = await fetch(
                    "http://localhost:8080/api/cart",
                    {
                        method: "GET",
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                if (response.status === 401) {

                   localStorage.removeItem("token");
                   localStorage.removeItem("user");

                     setUser(null);
                     setCartCount(0);

                  return;
                }

                if (!response.ok) {

                 setCartCount(0);

                 return;

                }

                const cart =
                    await response.json();

                setCartCount(
                    cart.totalItems || 0
                );

            } catch (error) {

                console.error(
                    "Unable to load cart count:",
                    error
                );

                setCartCount(0);
            }
        },
        []
    );


    // ==========================================
    // GET LOGGED-IN USER
    // ==========================================

    function updateUser() {

        try {

            const savedUser =
                localStorage.getItem("user");

            if (!savedUser) {
                setUser(null);
                return;
            }

            setUser(
                JSON.parse(savedUser)
            );

        } catch (error) {

            console.error(
                "Unable to read logged-in user:",
                error
            );

            localStorage.removeItem("user");
            setUser(null);
        }
    }


    // ==========================================
    // LOAD NAVBAR
    // ==========================================

    useEffect(() => {

        updateUser();

        if (localStorage.getItem("token")) {
            updateCartCount();
        }

        window.addEventListener(
            "cartUpdated",
            updateCartCount
        );

        window.addEventListener(
            "userUpdated",
            updateUser
        );

        return () => {

            window.removeEventListener(
                "cartUpdated",
                updateCartCount
            );

            window.removeEventListener(
                "userUpdated",
                updateUser
            );
        };

    }, [updateCartCount]);


    // ==========================================
    // LOGOUT
    // ==========================================

    function logout() {

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");

        setUser(null);
        setCartCount(0);

        window.dispatchEvent(
            new Event("userUpdated")
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        navigate(
            "/login",
            {
                replace: true
            }
        );
    }


    // ==========================================
    // SCROLL TO HOME SECTIONS
    // ==========================================

    function goToSection(sectionId) {

        if (location.pathname !== "/") {

            navigate(`/#${sectionId}`);

            setTimeout(() => {

                document
                    .getElementById(sectionId)
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }, 150);

            return;
        }

        document
            .getElementById(sectionId)
            ?.scrollIntoView({
                behavior: "smooth"
            });
    }


    return (

        <>

            {/* TOP INFO BAR */}

            <div className="top-info-bar">

    <div className="marquee">

        <div className="marquee-content">

            {/* FIRST SET */}

            <div className="top-info-item">
                <span>🛠</span>
                <strong>PROFESSIONAL MOBILE REPAIR IN AMBATTUR</strong>
            </div>

            <span className="top-divider">•</span>

            <div className="top-info-item">
                <span>🏪</span>
                <strong>IN-SHOP REPAIR ONLY</strong>
            </div>

            <span className="top-divider">•</span>

            <div className="top-info-item">
                <span>🎥</span>
                <strong>REPAIR VIDEO PROOF AVAILABLE</strong>
            </div>

            <span className="top-divider">•</span>

            <div className="top-info-item">
                <span>✓</span>
                <strong>QUALITY PARTS</strong>
            </div>

            <span className="top-divider">•</span>

            <div className="top-info-item">
                <span>👨‍🔧</span>
                <strong>EXPERT TECHNICIANS</strong>
            </div>

            <span className="top-divider">•</span>

            {/* SECOND SET */}

            <div className="top-info-item">
                <span>🛠</span>
                <strong>PROFESSIONAL MOBILE REPAIR IN AMBATTUR</strong>
            </div>

            <span className="top-divider">•</span>

            <div className="top-info-item">
                <span>🏪</span>
                <strong>IN-SHOP REPAIR ONLY</strong>
            </div>

            <span className="top-divider">•</span>

            <div className="top-info-item">
                <span>🎥</span>
                <strong>REPAIR VIDEO PROOF AVAILABLE</strong>
            </div>

            <span className="top-divider">•</span>

            <div className="top-info-item">
                <span>✓</span>
                <strong>QUALITY PARTS</strong>
            </div>

            <span className="top-divider">•</span>

            <div className="top-info-item">
                <span>👨‍🔧</span>
                <strong>EXPERT TECHNICIANS</strong>
            </div>

        </div>

    </div>

</div>

            {/* MAIN HEADER */}

            <header className="header">

    {/* LEFT */}

    <div className="header-left">

        <IconButton
            className="menu-btn"
            onClick={() => setDrawerOpen(true)}
        >
            <MenuIcon />
        </IconButton>

    </div>

    {/* CENTER */}

    <Link
        to="/"
        className="logo"
    >

        <div className="logo-title">

            <span className="logo-dark">
                AMBATTUR
            </span>

            <span className="logo-orange">
                MOBILES
            </span>

        </div>

        <div className="logo-tagline">

            Trusted Refurbished Mobiles & Repair

        </div>

    </Link>

    {/* RIGHT */}

    <div className="header-actions">

        <IconButton>

            <FavoriteBorderIcon />

        </IconButton>

        {user && (

            <Link
                to="/cart"
                className="cart-icon"
            >

                <Badge
                    badgeContent={cartCount}
                    color="error"
                >

                    <ShoppingCartIcon />

                </Badge>

            </Link>

        )}

        {user ? (

            <>
                <IconButton onClick={openMenu}>

                    <Avatar
                       sx={{
                            width: 38,
                            height: 38,
                            fontSize: 16,
                            bgcolor: "#ff6b00"
                       }}
                    >
                        {user.name?.charAt(0).toUpperCase()}
                    </Avatar>

                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                >

                    <MenuItem component={Link} to="/profile">
                        My Profile
                    </MenuItem>

                    <MenuItem component={Link} to="/orders">
                        My Orders
                    </MenuItem>

                    <MenuItem component={Link} to="/addresses">
                        Saved Addresses
                    </MenuItem>

                    <MenuItem component={Link} to="/change-password">
                        Change Password
                    </MenuItem>

                    <Divider />

                    <MenuItem
                        onClick={()=>{
                            closeMenu();
                            logout();
                        }}
                    >
                        Logout
                    </MenuItem>

                </Menu>

            </>

        ) : (

            <Link
                className="login-button"
                to="/login"
            >
                Login
            </Link>

        )}

    </div>

</header>

<Drawer
    anchor="left"
    open={drawerOpen}
    onClose={() => setDrawerOpen(false)}
>

<div
    style={{
        width:280
    }}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"18px"
}}
>

<h3>Categories</h3>

<IconButton
onClick={()=>setDrawerOpen(false)}
>
<CloseIcon/>
</IconButton>

</div>

<List>

{categories.map((item)=>(
<ListItem
key={item}
disablePadding
>

<ListItemButton>

<ListItemText
primary={item}
/>

</ListItemButton>

</ListItem>
))}

</List>

</div>

</Drawer>


            {/* NAVIGATION */}

{!isRepairPage && (

<nav className="navigation">

<NavLink
to="/"
end
className={({isActive})=>
isActive?"nav-link active":"nav-link"
}
>
Home
</NavLink>

<NavLink
to="/refurbished"
className={({isActive})=>
isActive?"nav-link active":"nav-link"
}
>
Refurbished
</NavLink>

<NavLink
to="/repair"
className={({isActive})=>
isActive?"nav-link active":"nav-link"
}
>
Repair
</NavLink>

<button
className="nav-link nav-button"
onClick={()=>goToSection("accessories")}
>
Accessories
</button>

<NavLink
to="/contact"
className={({isActive})=>
isActive?"nav-link active":"nav-link"
}
>
Contact
</NavLink>

</nav>

)}

        </>

    );
}


export default Navbar;