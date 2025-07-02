document.addEventListener("DOMContentLoaded", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderProductos = () => {
        url = "https://dummyjson.com/products/category/vehicle";
   

    fetch(url)
    .then((res) => res.json())
    .then((data) => {

        let contenidoProd = document.getElementById("seccion-productos");

        for (const producto of data.products){

            let tarjProduc = document.createElement("article");
            tarjProduc.classList.add("tarjeta-producto");

            let imgProduc  = document.createElement("img");
            imgProduc.src  = producto.images[1];
            imgProduc.alt  = producto.description;

            let titProduc  = document.createElement("h3");
            titProduc.classList.add("titulo-producto");
            titProduc.textContent = producto.title;


            let precioProd = document.createElement("p");
            precioProd.textContent = `$${producto.price}`;


            let btnAgregar = document.createElement("button");
            btnAgregar.textContent = "Agregar";

            btnAgregar.addEventListener("click", () => {
                Swal.fire({
                    title: `${producto.title} agregado al carrito`,
                    icon: "success",
                    draggable: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    background: "#2b2b2b", // Fondo oscuro para el SweetAlert
                    color: "#e0e0e0",
                });
                agregarProducto(producto);
                actualizarProductoAgreg();
            });

            tarjProduc.appendChild(imgProduc);
            tarjProduc.appendChild(titProduc);
            tarjProduc.appendChild(precioProd);
            tarjProduc.appendChild(btnAgregar);

            contenidoProd.appendChild(tarjProduc);
        };


    })
    .catch((err) => console.error("error, algo paso: ", err));
 
};

    const agregarProducto = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

    const actualizarProductoAgreg = () => {
        
        const contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };

    renderProductos();
    actualizarProductoAgreg();
    
});
