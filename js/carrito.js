document.addEventListener("DOMContentLoaded", () => {

    const renderProductos = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let sectionProductos = document.getElementById("contenedor-carrito");
        sectionProductos.innerHTML = "";

        actualizarContador(carrito);

        if (!carrito.length) {
            let msgCarrito = document.createElement("p");
            msgCarrito.classList.add("mensaje-carrito");
            msgCarrito.textContent = "No hay productos";
            sectionProductos.appendChild(msgCarrito);
        } else {
            carrito.forEach((elemento, index) => {
                let tarjProduc = document.createElement("article");
                tarjProduc.classList.add("tarjeta-producto");

                let imgProduc = document.createElement("img");
                imgProduc.src = elemento.images[0];

                let titProduc = document.createElement("h3");
                titProduc.textContent = elemento.title;

                let precioProd = document.createElement("p");
                precioProd.textContent = `$${elemento.price}`;

                let btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn-eliminar-carrito");
                btnEliminar.textContent = "Eliminar";

                btnEliminar.addEventListener("click", () => {
                    eliminarProd(index);
                });

                tarjProduc.appendChild(imgProduc);
                tarjProduc.appendChild(titProduc);
                tarjProduc.appendChild(precioProd);
                tarjProduc.appendChild(btnEliminar);
                sectionProductos.appendChild(tarjProduc);
            });
        }

        renderBtn();
    };

    const actualizarContador = (carrito) => {
        const contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };

    const renderBtn = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let divAction = document.getElementById("acciones-carrito");
        divAction.innerHTML = "";

        if (carrito.length) {
            let btnVacio = document.createElement("button");
            btnVacio.textContent = "Vaciar carrito";

            btnVacio.addEventListener("click", () => {
                vaciarCarrito();
            });

            let btnFinalizarCompra = document.createElement("button");
            btnFinalizarCompra.textContent = "Finalizar Compra";

            btnFinalizarCompra.addEventListener("click", () => {
                Swal.fire({
                    title: "¿Deseas finalizar la compra?",
                    text: "Una vez confirmada, no podrás deshacerla.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, finalizar compra",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Compra realizada",
                            text: "Gracias por tu compra.",
                            icon: "success"
                        }).then(() => {
                            // Limpio el carrito y redirijo
                            localStorage.removeItem("carrito");
                            window.location.href = "./index.html";
                        });
                    }
             });
            });

            divAction.appendChild(btnVacio);
            divAction.appendChild(btnFinalizarCompra);
        }
    };

    const eliminarProd = (indice) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Swal.fire({
            title: "Eliminado",
            icon: "success",
            draggable: true
        }); 
        renderProductos();
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        Swal.fire({
            title: "Esta seguro que quiere vaciar el carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero vaciarlo"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Vaciado",
                text: "Carrito Vacio",
                icon: "success"
                });
            }
            });
        renderProductos();
    };

    renderProductos();
});
