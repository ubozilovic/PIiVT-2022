import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Menu from '../Menu/Menu';
import ContactPage from '../Pages/ContactPage/ContactPage';
import { Provider } from 'react-redux';
import './Application.sass';
import UserCategoryList from '../User/UserCategoryList/UserCategoryList';
import UserCategoryPage from '../User/UserCategoryPage/UserCategoryPage';
import AdminDashboard from '../Administrator/Dashboard/AdminDashboard';
import AdminCategoryList from '../Administrator/Dashboard/AdminCategoryList';
import AdminCategoryIngredientsList from '../Administrator/Dashboard/AdminCategoryIngredientsList';
import AdminAdministratorList from '../Administrator/Dashboard/AdminAdministratorList';
import AdminAdministratorAdd from '../Administrator/Dashboard/AdminAdministratorAdd';
import AdminItemList from '../Administrator/Dashboard/AdminItemList';
import AdminItemAdd from '../Administrator/Dashboard/AdminItemAdd';
import AdminItemEdit from '../Administrator/Dashboard/AdminItemEdit';
import AdministratorLoginPage from '../Administrator/AdministratorLoginPage/AdministratorLoginPage';
import AppStore from '../../stores/AppStore';

function Application() {
  return (
    <Provider store={ AppStore }>
      <Container className="mt-4">
        <Menu />

        <Routes>
          <Route path="/" element={ <div></div> } />
          <Route path='/contact' element={ <ContactPage /> } />
          
          
          <Route path='/auth/administrator/login' element={ <AdministratorLoginPage /> } />
          <Route path="/categories" element={ <UserCategoryList /> } />
          <Route path="/category/:id" element={ <UserCategoryPage /> } />

          

          <Route path="/admin/dashboard" element={ <AdminDashboard /> } />
          <Route path="/admin/dashboard/category/list" element={ <AdminCategoryList /> } />
          <Route path="/admin/dashboard/category/:cid/ingredients" element={ <AdminCategoryIngredientsList /> } />
          <Route path="/admin/dashboard/category/:cid/items/list" element={ <AdminItemList /> } />
          <Route path="/admin/dashboard/category/:cid/items/add" element={ <AdminItemAdd /> } />
          <Route path="/admin/dashboard/category/:cid/items/edit/:iid" element={ <AdminItemEdit /> } />

          

          <Route path="/admin/dashboard/administrator/list" element={ <AdminAdministratorList /> } />
          <Route path="/admin/dashboard/administrator/add" element={ <AdminAdministratorAdd /> } />

       

          
        </Routes>
      </Container>
    </Provider>
  );
}

export default Application;
