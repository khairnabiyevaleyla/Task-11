const AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 1000,
});

const loginUser = async (url, payload) => {
  await AxiosInstance.post(url, payload)
    .then((res) => {
      sessionStorage.setItem("token", res?.data?.accessToken);
      if (res.status === 200) {
        alert("Success");
        setTimeout(() => {
          window.location.href = "http://127.0.0.1:5500/public/index.html";
        }),
          2000;
      }
    })
    .catch((error) => {
      alert("Invalid");
    });
};

const FormSubmit = document.querySelector("#sign-in-form");
const UserName = document.querySelector("#username");
const Password = document.querySelector("#password");

FormSubmit &&
  FormSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    let payload = {
      username: UserName.value,
      password: Password.value,
    };
    loginUser("/auth/login", payload);
  });

/* const myURL = "https://dummyjson.com";

const partnersUrl = "/auth/login";
const user = JSON.parse(localStorage.getItem("user"));

const authAxiosInstance = axios.create({
  baseURL: myURL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${user?.accessToken}`,
  },
}); */

/* const ErrorMessage = document.querySelector(".error"); */

/* function authApi(url, payload, func) {
  console.log(payload);
  authAxiosInstance
    .post(url, payload)
    .then((res) => {
      sessionStorage.setItem("user", JSON.stringify(res.data));

      if (typeof func === "function") {
        func();
      }
    })
    .catch((err) => {
      if (ErrorMessage) {
        console.log(err);
        ErrorMessage.innerHTML =
          err.response?.data?.message || "An error occurred.";
        ErrorMessage.style.padding = "7px";
      } else {
        console.error("ErrorMessage element not found:", err);
      }
      });
      }  */

/* console.log(FormSubmit);
FormSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const payload = {
    username: UserName.value,
    password: Password.value,
    // username: 'emilys',
    // password: 'emilyspass',
    
    expiresInMins: 60,
    };
    authApi("/auth/login", payload, () => {
      let userJson = sessionStorage.getItem("user");
      if (userJson != null) {
        window.location.href = "/public/index.html";
        } else {
          console.log("token missing");
        ErrorMessage.innerHTML = "Unable to find token from storage.";
        ErrorMessage.style.padding = "7px";
        }
        });
}); */
