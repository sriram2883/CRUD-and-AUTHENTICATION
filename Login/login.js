function changeForm(type) {
    if (type === 1) {
        document.getElementById('LoginForm').style.display = 'none';
        document.getElementById('RegistrationForm').style.display = 'block';
        document.getElementById('AdminForm').style.display = 'none';
    } else if(type === 0) {
        document.getElementById('LoginForm').style.display = 'block';
        document.getElementById('AdminForm').style.display = 'none';
        document.getElementById('RegistrationForm').style.display = 'none';
    }
    else{
        document.getElementById('LoginForm').style.display = 'none';
        document.getElementById('AdminForm').style.display = 'block';
        document.getElementById('RegistrationForm').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('LoginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formdata = new FormData(this);
        var req=new XMLHttpRequest();
        req.open("POST", "/login", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    alert("Login successful");
                    window.location.href = '/bank';
                    localStorage.setItem('token',JSON.stringify( JSON.parse(req.responseText).token));
                    localStorage.setItem('user',JSON.stringify( formdata.get('username')));

                    
                } else {
                    alert(req.responseText);
                }
            }
        };
        req.send(JSON.stringify({username: formdata.get('username'),email:formdata.get('email'), password: formdata.get('password')}));
    });
    document.getElementById('RegistrationForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formdata = new FormData(this);
        var req=new XMLHttpRequest();
        req.open("POST", "/register", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 201) {
                    alert("Registration successful please login");
                    changeForm(0);
                } else {
                    alert(req.responseText);
                }
            }
        };
        req.send(JSON.stringify({username: formdata.get('username'),email:formdata.get('email'), password: formdata.get('password')}));
    });

    document.getElementById('AdminForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formdata = new FormData(this);
        var req=new XMLHttpRequest();
        req.open("POST", "/admin", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    alert("Login successful");
                    window.location.href = '/admin';
                    localStorage.setItem('token',JSON.stringify( JSON.parse(req.responseText).token));
                    localStorage.setItem('user',JSON.stringify( formdata.get('username')));
                } else {
                    alert(req.responseText);
                }
            }
        };
        req.send(JSON.stringify({username: formdata.get('username'),email:formdata.get('email'), password: formdata.get('password')}));
    });
});