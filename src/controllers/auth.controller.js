import * as authServices from "../services/auth.services.js"

export const signin = (request, response) => {
    const { email, password } = request.body;
    authServices.signin(email, password)
        .then(data => {
            response.status(200).json(data);
        })
        .catch(err => {
            response.status(500).send(err);
        });
}

export const signup = (request, response) => {
    const user = request.body;
    console.log(user);
    authServices.signup(user)
        .then((message) => { response.status(200).json(message) })
        .catch(err => { response.status(500).send(err) });

}

export const getUserByEmail = (request, response) => {
    const { email } = request.body;
    authServices.getUserByEmail(email)
        .then(user => {
            if(!user.length){
                response.status(200).json({message:"User Not Found"})
            }else{
                response.status(200).json(user)
            }
        })
        .catch(err => { response.status(500).send(err) });
}