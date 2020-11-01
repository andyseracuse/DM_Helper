import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './main.css';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const App = () => {
  const [modal, setModal] = useState(true)

  const toggle = () => setModal(!modal);

  return(
    <div>
      hello
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('productInfo'));