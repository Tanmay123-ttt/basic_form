import { useState } from 'react';

const Contact = () => {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="name" style={{ marginBottom: '10px' }}>Name</label>
      <input type="text" name="name" id="name" value={formFields.name} onChange={handleInputChange} style={{ marginBottom: '20px', padding: '5px' }} />

      <label htmlFor="email" style={{ marginBottom: '10px' }}>Email</label>
      <input type="email" name="email" id="email" value={formFields.email} onChange={handleInputChange} style={{ marginBottom: '20px', padding: '5px' }} />

      <label htmlFor="message" style={{ marginBottom: '10px' }}>Message</label>
      <textarea name="message" id="message" value={formFields.message} onChange={handleInputChange} style={{ marginBottom: '20px', padding: '5px' }} />

      <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px' }}>Send</button>
    </form>
  );
};

export default Contact;
