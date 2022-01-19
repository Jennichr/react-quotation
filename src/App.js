import { useState, useRef, useEffect } from "react";
import QuotationTable from "./QuotationTable";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import useLocalStorage from 'react-localstorage-hook';

function App() {

  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discRef = useRef();

  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);

  const dummyProductList = [
    { id: "p001", name: "Dark Chocolate Chunck", price: 15000 },
    { id: "p002", name: "Caramelized Crunch", price: 4000 },
    { id: "p003", name: "Orange & Milk Chocolate", price: 5500 },
    { id: "p004", name: "Lemon", price: 20000 },
  ];

  const addItem = () => {
    if (itemRef.current.value === "") {
      alert("Item name is empty.");
      return;
    }

    if (Number(discRef.current.value) > Number(ppuRef.current.value)) {
      alert("Discount can't be higher than price.")
      return;
    }

    const pid = itemRef.current.value
    const product = dummyProductList.find(e => e.id === pid)

    var itemObj = {
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      disc: discRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems])
  };

  // const mergeRedudant = dataItems.find((member) => {
  //   return member.item === "Caramelized Crunch"
  // })
  // console.log(mergeRedudant)

  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);
    ppuRef.current.value = product.price
  }

  const options = dummyProductList.map(v => {
    return <option value={v.id} key={v.id}>{v.name}</option>
  });


  return (
    <Container>
      <Row>
        <Col xs={5} style={{backgroundColor:'#127D69', padding: "10px", borderRadius: "10px"}}>
        <Form>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={itemRef}
                onChange={productChange}
              >
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price Per Unit" ref={ppuRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQauntity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Quantity" ref={qtyRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" placeholder="Discount" ref={discRef} />
            </Form.Group>

            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>
          </Form>
        </Col>
        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
