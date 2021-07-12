function saveToken(token){
    sessionStorage.setItem("authToken",token);
};

function getToken(){
    return sessionStorage.getItem("authToken");
}

function clearToken(){
    return sessionStorage.removeItem("authToken");
}

export {saveToken, getToken, clearToken}; 