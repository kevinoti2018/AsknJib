import joi from 'joi'



export const registrationSchema = joi.object({
Username:joi.string().required().min(3),
Email:joi.string().email().required(),
Password:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))

})

export const resetPasswordSchema = joi.object({
   
    newPassword:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))
    })



    