import Avatar from "@mui/material/Avatar";

function ProductImage({

    imageUrl,

    title

}) {

    const src = imageUrl

        ? imageUrl.startsWith("http")

            ? imageUrl

            : `http://localhost:8080${imageUrl}`

        : "/placeholder-phone.png";

    return (

        <Avatar

            src={src}

            alt={title}

            variant="rounded"

            sx={{
                width: 60,
                height: 60
            }}

        />

    );

}

export default ProductImage;