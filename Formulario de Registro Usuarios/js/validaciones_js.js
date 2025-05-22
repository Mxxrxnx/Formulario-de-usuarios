document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const usuario = document.getElementById('usuario');
    const contraseña = document.getElementById('contraseña');
    const confirmPassword = document.getElementById('confirmPassword');
    const direccion = document.getElementById('direccion');
    const comuna = document.getElementById('comuna');
    const telefono = document.getElementById('telefono');
    const urlWeb = document.getElementById('urlWeb');
    const aficion = document.getElementById('aficion');
    const btnAgregarAficion = document.getElementById('btnAgregarAficion');
    const listaAficiones = document.getElementById('listaAficiones');
    const sinAficiones = document.getElementById('sinAficiones');
    
    let aficiones = [];

    function mostrarError(input, mensaje) {
        const errorDiv = document.getElementById('error' + input.id.charAt(0).toUpperCase() + input.id.slice(1));
        errorDiv.textContent = mensaje;
        input.classList.add('is-invalid');
    }

    function limpiarError(input) {
        const errorDiv = document.getElementById('error' + input.id.charAt(0).toUpperCase() + input.id.slice(1));
        errorDiv.textContent = '';
        input.classList.remove('is-invalid');
    }

    function validarUsuario() {
        const valor = usuario.value.trim();
        const regex = /^[a-zA-Z]+\d*$/;
        
        if (valor === '') {
            mostrarError(usuario, 'El nombre de usuario es OBLIGATORIO');
            return false;
        } else if (valor.length < 5 || valor.length > 10) {
            mostrarError(usuario, 'El nombre debe tener entre 5 y 10 caracteres');
            return false;
        } else if (!regex.test(valor)) {
            mostrarError(usuario, 'El nombre debe comenzar con letras y puede contener dígitos solo al final');
            return false;
        } else {
            limpiarError(usuario);
            return true;
        }
    }

    function validarContraseña() {
        const valor = contraseña.value;
        const nombreUsuario = usuario.value.trim().toLowerCase();
        const tieneLetras = /[a-zA-Z]/.test(valor);
        const tieneNumeros = /\d/.test(valor);
        
        if (valor === '') {
            mostrarError(contraseña, 'La contraseña es OBLIGATORIA');
            return false;
        } else if (valor.length < 3 || valor.length > 6) {
            mostrarError(contraseña, 'La contraseña debe tener entre 3 y 6 caracteres');
            return false;
        } else if (!tieneLetras || !tieneNumeros) {
            mostrarError(contraseña, 'La contraseña debe tener al menos una letra y un número');
            return false;
        } else if (nombreUsuario !== '' && valor.toLowerCase().includes(nombreUsuario)) {
            mostrarError(contraseña, 'La contraseña no puede contener el NOMBRE DE USUARIO');
            return false;
        } else {
            limpiarError(contraseña);
            return true;
        }
    }

    function validarConfirmacion() {
        if (confirmPassword.value === '') {
            mostrarError(confirmPassword, 'Debes confirmar la contraseña');
            return false;
        } else if (confirmPassword.value !== contraseña.value) {
            mostrarError(confirmPassword, 'Las contraseñas NO COINCIDEN');
            return false;
        } else {
            limpiarError(confirmPassword);
            return true;
        }
    }

    function validarDireccion() {
        if (direccion.value.trim() === '') {
            mostrarError(direccion, 'La dirección es OBLIGATORIA');
            return false;
        } else {
            limpiarError(direccion);
            return true;
        }
    }

    function validarComuna() {
        if (comuna.value === '') {
            mostrarError(comuna, 'Debes seleccionar una comuna');
            return false;
        } else {
            limpiarError(comuna);
            return true;
        }
    }

    function validarTelefono() {
        const valor = telefono.value.trim();
        const regex = /^\+569\d{8}$/;
        
        if (valor === '') {
            mostrarError(telefono, 'El número de teléfono es OBLIGATORIO');
            return false;
        } else if (!regex.test(valor)) {
            mostrarError(telefono, 'Formato inválido. Usa el siguente formato: +569XXXXXXXX');
            return false;
        } else {
            limpiarError(telefono);
            return true;
        }
    }
    
    function validarUrlWeb() {
        const valor = urlWeb.value.trim();
        
        if (valor === '') {
            return true;
        }
        
        try {
            const url = new URL(valor);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                mostrarError(urlWeb, 'La URL debe comenzar con http:// o https://');
                return false;
            }
            limpiarError(urlWeb);
            return true;
        } catch (e) {
            mostrarError(urlWeb, 'Formato de URL inválido');
            return false;
        }
    }


    function validarAficiones() {
        const errorAficiones = document.getElementById('errorAficiones');
        
        if (aficiones.length < 2) {
            errorAficiones.textContent = 'Debes añadir al menos 2 aficiones';
            return false;
        } else {
            errorAficiones.textContent = '';
            return true;
        }
    }

    function agregarAficion() {
        const nuevaAficion = aficion.value.trim();
        const errorAficiones = document.getElementById('errorAficiones');
        
        if (nuevaAficion === '') {
            return;
        }
        
        if (aficiones.includes(nuevaAficion)) {
            errorAficiones.textContent = 'Esta afición ya se agregó';
            aficion.classList.add('is-invalid');
            return;
        }
        
        errorAficiones.textContent = '';
        aficion.classList.remove('is-invalid');
        aficiones.push(nuevaAficion);
        actualizarListaAficiones();
        aficion.value = '';
    }

    function eliminarAficion(index) {
        aficiones.splice(index, 1);
        actualizarListaAficiones();
    }

    function actualizarListaAficiones() {
        if (aficiones.length === 0) {
            sinAficiones.style.display = 'block';
        } else {
            sinAficiones.style.display = 'none';
        }
        
        let html = '';
        aficiones.forEach((item, index) => {
            html += `
                <div class="aficion-item">
                    <span>${item}</span>
                    <button type="button" class="remove-aficion" data-index="${index}">×</button>
                </div>
            `;
        });
        
        listaAficiones.innerHTML = html + (aficiones.length === 0 ? sinAficiones.outerHTML : '');
        
        document.querySelectorAll('.remove-aficion').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                eliminarAficion(index);
            });
        });
    }


    function validarFormulario() {
        const esUsuarioValido = validarUsuario();
        const esContraseñaValida = validarContraseña();
        const esConfirmacionValida = validarConfirmacion();
        const esDireccionValida = validarDireccion();
        const esComunaValida = validarComuna();
        const esTelefonoValido = validarTelefono();
        const esUrlValida = validarUrlWeb();
        const sonAficionesValidas = validarAficiones();
        
        return esUsuarioValido && 
               esContraseñaValida && 
               esConfirmacionValida && 
               esDireccionValida && 
               esComunaValida && 
               esTelefonoValido && 
               esUrlValida && 
               sonAficionesValidas;
    }

    
    btnAgregarAficion.addEventListener('click', agregarAficion);
    
    aficion.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            agregarAficion();
        }
    });

    usuario.addEventListener('blur', validarUsuario);
    contraseña.addEventListener('blur', validarContraseña);
    confirmPassword.addEventListener('blur', validarConfirmacion);
    direccion.addEventListener('blur', validarDireccion);
    comuna.addEventListener('change', validarComuna);
    telefono.addEventListener('blur', validarTelefono);
    urlWeb.addEventListener('blur', validarUrlWeb);

    usuario.addEventListener('input', function() { 
        limpiarError(usuario); 
        if (contraseña.value !== '') {
            validarContraseña();
        }
    });
    
    contraseña.addEventListener('input', function() { limpiarError(contraseña); });
    confirmPassword.addEventListener('input', function() { limpiarError(confirmPassword); });
    direccion.addEventListener('input', function() { limpiarError(direccion); });
    telefono.addEventListener('input', function() { limpiarError(telefono); });
    urlWeb.addEventListener('input', function() { limpiarError(urlWeb); });
    aficion.addEventListener('input', function() { 
        const errorAficiones = document.getElementById('errorAficiones');
        errorAficiones.textContent = '';
        aficion.classList.remove('is-invalid');
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            alert('¡Formulario enviado!');
            console.log('Datos del formulario:', {
                usuario: usuario.value,
                direccion: direccion.value,
                comuna: comuna.value,
                telefono: telefono.value,
                urlWeb: urlWeb.value,
                aficiones: aficiones
            });
        } else {
            validarUsuario();
            validarContraseña();
            validarConfirmacion();
            validarDireccion();
            validarComuna();
            validarTelefono();
            validarUrlWeb();
            validarAficiones();
        }
    });

        comuna.selectedIndex = 0;
    });
