import React, { useEffect } from "react";
import AddButton from "../../components/ui/addButton/Addbutton";
import Modal from "../../components/modal/Modal";
import { useState } from "react";
import axios from "axios";
import Product from "../../components/product/Product";
function ProductPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const pegarTodasAsProductsDaApi = () => {
    axios
      .get("http://localhost:4444/products")
      .then((res) => {
        // console.log(res)
        // console.log(res.data)
        setProducts(res.data.products);
      })
      .catch((err) => console.log("erro ao pegar os dados da api", err));
  };
  const createProduct = async (name, description, quantity) => {
    await axios
      .post("http://localhost:4444/products/create-product", {
        name,
        description,
        quantity,
      })
      .then((res) => {
        // console.log(res)
        // console.log(res.data)
        setProducts([...products, res.data.data]);
        // pegarTodasAsProductsDaApi()
      })
      .catch((err) => console.log("erro ao pegar os dados da api", err));
  };
  const deleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:4444/products/delete-product/${id}`)
      .then((res) => {
        // console.log(res)
        // console.log(res.data)
        setProducts(products.filter((n) => n._id !== id));
        // pegarTodasAsProductsDaApi()
      })
      .catch((err) => console.log("erro ao pegar os dados da api", err));
  };

  const editProduct = (name, description, quantity, id) => {
    axios
      .put(`http://localhost:4444/products/edit-product`, {
        name,
        description,
        quantity,
        _id: id,
      })
      .then((res) => {
        // console.log(res)
        // console.log(res.data)
        let newUpdatedProducts = products.map((n) => {
          if (n._id === id) {
            return res.data.updatedProduct;
          }
          return n;
        });
        setProducts(newUpdatedProducts);
      })
      .catch((err) => console.log("erro ao pegar os dados da api", err));
  };

  useEffect(() => {
    pegarTodasAsProductsDaApi();
    // editProduct(1,"batatadoce","editado")
  }, []);
  const mudarModal = () => {
    setShowModal((state) => !state);
  };

  // function fecharOModal(){
  //   setShowModal(false)
  // }
  // function abrirOModal(){
  //   setShowModal(true)
  // }
  return (
    <div>
      <AddButton abrirOModal={mudarModal} />
      {showModal ? (
        <Modal createProduct={createProduct} fecharOModal={mudarModal} />
      ) : null}
      {editingProduct ? (
        <Modal
          createProduct={editProduct}
          editingProduct={editingProduct}
          fecharOModal={() => setEditingProduct(null)}
        />
      ) : null}
      <div className="Productslist">
        {products.map((n) => (
          <Product
            {...n}
            deleteProduct={deleteProduct}
            editProduct={editProduct}
            setEditMode={(data) => setEditingProduct(data)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;