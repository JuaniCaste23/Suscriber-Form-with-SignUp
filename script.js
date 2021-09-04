/*variables*/

const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const eyeicon = document.querySelector('.eye-icon');
const insertext = document.getElementById('innerhtml');

console.log(form); //probando si andan las variables

/*funciones*/

//funcion que demuestra que el input fue ingresado equivocadamente
const showError = (input, message) => {
    
    const formControl = input.parentElement;
    
    input.classList.add('input-error');
    input.removeAttribute('placeholder');
    formControl.children[1].style.display = "block"; //input-group__icon
    formControl.children[2].style.display = "block"; //error-message
    formControl.children[2].innerText = message;
    
};

//funcion que demuestra que el input fue ingresado correctamente
const showSuccess = (input) => {
    
    const formControl = input.parentElement;
    
    input.classList.remove('input-error');
    formControl.children[1].style.display = 'none';
    formControl.children[2].style.display = 'none';
    
};

//funcion que convierte texto a uppercase
const getFieldName = (input) => {
    
    const name = input.name;
    return name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))); 
    //se uso una expresion regular para convertir a uppercase.
    
};

//funcion que valida email
const checkEmail = (input) => {
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //se uso una expresion regular para validar el email.
    
    if( re.test(input.value.trim()) ) 
    {
        showSuccess(input);
        input.classList.remove('placeholder');
    } 
    else 
    {
        showError(input, 'Looks like this is not an email');
        input.classList.add('placeholder');
        input.placeholder = "email@example.com";
    }

};

//funcion que valida los input con las funciones showError y showSuccess, recorre el array de los input y los va verificando.
const checkRequired = ( inputArr ) => {

    inputArr.forEach( input => {
        
        if ( input.value.trim() === '') 
        {
            showError(input, `${getFieldName(input)} cannot be empty`); //agrega el nombre del input a arreglar (convertido a uppercase) y el msj de empty, abajo del input junto a su icono rojo de error.
        } 
        else 
        {
            showSuccess(input);
        }   
        
    });
};

const passwordVisible = () => {
    
    password.type = 'text';
    eyeicon.style.backgroundImage = "url('images/visibility_black_24dp.svg')";
    eyeicon.style.transition = "1s";
    insertext.innerHTML = 'Visible';
    insertext.style.color = "var(--green)";
    
};

const passwordHidden = () => {
    
    password.type = 'password';
    eyeicon.style.backgroundImage = "url('images/visibility_off_black_24dp.svg')";
    eyeicon.style.transition = "800ms";
    insertext.innerHTML = 'Hidden';
    insertext.style.color = "var(--red)";
    
};

//funcion que revela la password con el ojito, (las funciones que se llaman fueron declaradas arriba)
const revelatePassword = (e) => {
   
    if(password.type === 'password')
    {
        passwordVisible();
    }
    else
    {
        passwordHidden();
    }
    
};

//funcion para llamar a los eventos de los input
const functionForm = (e) => {
    
    e.preventDefault();
    checkRequired([fname, lname, email, password]);
    checkEmail(email);
    //queda la password en modo hidden
    passwordHidden();
    
};

/*eventos*/

form.addEventListener('submit',functionForm);
eyeicon.addEventListener('click',revelatePassword);
