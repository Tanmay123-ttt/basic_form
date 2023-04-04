import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="name" style={{ marginBottom: '10px' }}>Name</label>
      <input type="text" name="name" id="name" {...register('name', { required: true })} style={{ marginBottom: '20px', padding: '5px' }} />
      {errors.name && <span style={{ color: 'red' }}>Name is required</span>}

      <label htmlFor="email" style={{ marginBottom: '10px' }}>Email</label>
      <input type="email" name="email" id="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} style={{ marginBottom: '20px', padding: '5px' }} />
      {errors.email && <span style={{ color: 'red' }}>Please enter a valid email address</span>}

      <label htmlFor="message" style={{ marginBottom: '10px' }}>Message</label>
      <textarea name="message" id="message" {...register('message', { required: true })} style={{ marginBottom: '20px', padding: '5px' }} />
      {errors.message && <span style={{ color: 'red' }}>Message is required</span>}

      <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px' }}>Send</button>
    </form>
  );
};

export default Contact;

