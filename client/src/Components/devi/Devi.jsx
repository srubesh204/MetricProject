import React, { useState } from 'react'

const Devi = () => {
    const UserCredential = {
        Username: "Test",
        Password: "Test@123"
    }

    const [inputData, setInputData] = useState({})

    const userPwd = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => ({ ...prev, [name]: value }))
    }

    const LoginCheck = () => {
        UserCredential.Username !== inputData.user || UserCredential.Password !== inputData.passWord ? alert("Login Failed") : alert("Login Successfull")
    }

    console.log(inputData)

    return (
        <div >
            <div className='col'>
                <div className='text-center'>
                    <button type="button" className='btn btn-warning'>Login</button>
                </div>

                <div className='card ' style={{ width: "250px", height: "250px" }}>
                    <div className="mb-2 text-center">
                        <input type="text" className="form-control" id="userId" placeholder="user" name="user" onChange={userPwd} />

                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="passWordId" placeholder="passWord" name="passWord" onChange={userPwd} />
                    </div>
                    <div className='text-center'>
                        <button type="button" className='btn btn-warning' onClick={LoginCheck}>Login</button>
                    </div>
                </div>
            </div>
            <div>
                <div className='text-center'>
                    <button type="button" className='btn btn-warning'>Register</button>
                </div>
            </div>





        </div>
    )
}

export default Devi