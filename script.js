/*variables*/

const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const eyeicon = document.querySelector('.eye-icon');

console.log(form); //probando si andan las variables

/*funciones*/

//funcion que demuestra que el input fue ingresado equivocadamente
const showError = (input, message) => {
    
    const formControl = input.parentElement;
    input.classList.add('input-error');
    input.removeAttribute('placeholder');
    formControl.children[1].style.display = "block";
    formControl.children[2].style.display = "block";
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
    return name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))); //se uso una expresion regular para convertir a uppercase.
    
};

//funcion que valida email
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //se uso una expresion regular para validar el email.
    
    if( re.test(input.value.trim()) ) 
    {
        showSuccess(input);
    } 
    else 
    {
        showError(input, 'Looks like this is not an email');
        input.value = "email@example/com";
    }

};

//funcion que valida los input con las funciones showError y showSuccess
const checkRequired = ( inputArr ) => {

    inputArr.forEach( input => {
        
        if ( input.value.trim() === '') 
        {
            showError(input, `${getFieldName(input)} cannot be empty`);
            password.type = 'password';
        } 
        else 
        {
            showSuccess(input);
        }   
        
    });
};

//funcion que revela la password con el ojito, y tiene un innerhtml
const revelatePassword = (e) => {
   
    const insertText = document.getElementById('innerhtml');
    
    if(password.type === 'password')
    {
        password.type = 'text';
        eyeicon.style.backgroundImage = "url('images/visibility_black_24dp.svg')";
        innerhtml.innerHTML = 'Visible';
        innerhtml.style.color = "var(--green)"
    }
    else
    {
        password.type = 'password';
        eyeicon.style.backgroundImage = "url('images/visibility_off_black_24dp.svg')";
        innerhtml.innerHTML = 'Hidden';
        innerhtml.style.color = "var(--red)"
    }
    
};

//funcion para llamar a los eventos de los input
const functionForm = (e) => {
    
    e.preventDefault();
    checkRequired([fname, lname, email, password]);
    checkEmail(email);
    
};

/*eventos*/

form.addEventListener('submit',functionForm);
eyeicon.addEventListener('click',revelatePassword);
