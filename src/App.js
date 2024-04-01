import React from 'react';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Product';
import News from './Pages/News';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Wire from './Products/Wire';
import Pipes from './Products/Pipes';
import Waterpipes from './Products/Waterpipes';
import Blubs from './Products/Blubs';
import Plastictaps from './Products/Plastictaps';
import Stelltaps from './Products/Stelltaps';
import Login from './Pages/Login';
import Admin from './Admin/AdminPage';
import AdminUploadComponent from './Admin/AdminUploadComponent';
import AdminProduct from './Admin/AdminProduct';
import AdminPWires from './Admin/AdminPWires';
import Admincontact from './Admin/Admincontact';
import AdminNews from './Admin/AdminNews';
import AdminPipes from './Admin/AdminPipes';
import AdminWaterpipes from './Admin/AdminWaterpipes';
import AdminBlubs from './Admin/AdminBlubs';
import AdminPlastictaps from './Admin/AdminPlastictaps';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wire" element={<Wire />} />
          <Route path="/pipes" element={<Pipes />} />
          <Route path="/waterpipes" element={<Waterpipes />} />
          <Route path="/blubs" element={<Blubs />} />
          <Route path="/plastictaps" element={<Plastictaps />} />
          <Route path="/stelltaps" element={<Stelltaps />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminuploadcomponent" element={<AdminUploadComponent />} />
          <Route path="/adminproduct" element={<AdminProduct />} />
          <Route path="/adminwire" element={<AdminPWires />} />
          <Route path="/admincontact" element={<Admincontact />} />
          <Route path="/adminnews" element={<AdminNews />} />
          <Route path="/adminpipes" element={<AdminPipes />} />
          <Route path="/adminwaterpipes" element={<AdminWaterpipes />} />
          <Route path="/adminblubs" element={<AdminBlubs />} />
          <Route path="/adminplastictaps" element={<AdminPlastictaps />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
