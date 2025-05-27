import { useState } from 'react';
function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <form className='form'>
      <label className='form-label'>Enter your email:
        <input className='form-input' type="text" value={email}/>
      </label>
      <label className='form-label'>Enter password:
        <input className='form-input' type="text" value={password} />
      </label>
    </form>
  )
}
export default Form