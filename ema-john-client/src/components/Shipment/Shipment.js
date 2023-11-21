import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { UserContext } from '../UserContext/UserContext';

const Shipment = () => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example"));

    return (

      <div className='ship-form-area'>
        <form className='ship-form' onSubmit = {handleSubmit(onSubmit)}>
          <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder='name' />
          {errors.name && <span className='error'>Name is required</span>}

          <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder='email' />
          {errors.email && <span className='error'>Email is required</span>}
          
          <input {...register("address", { required: true })} placeholder='address' />
          {errors.address && <span className='error'>Address is required</span>}
          
          <input {...register("phone", { required: true })} placeholder='phone' />
          {errors.phone && <span className='error'>Phone number is required</span>}
          
          <input type="submit" />
        </form>
      </div>
    );
}

export default Shipment