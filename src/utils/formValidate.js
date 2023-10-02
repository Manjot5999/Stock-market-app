const formValidate = (email, password) => {
  const emailCheck = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const passwordCheck = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
  if (!emailCheck) {
    return [false, 'email is not valid'];
  }
  if (!passwordCheck) {
    return [false, 'password  is not valid'];
  }
  return true;
};
export default formValidate
;
