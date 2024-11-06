const myURL = "http://localhost:3000";
const axiosInstance = axios.create({
  baseURL: myURL,
  timeout: 1000,
});

const getAPIdataWithAxios = async (url, cb) => {
  axiosInstance
    .get(url)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => console.log("Error fetching data:", error));
};

const partnersRow = document.getElementById("partners-row");

const addPartnerLogoData = (data) => {
  if (data && partnersRow) {
    let htmlContent = "";
    data.forEach((element) => {
      htmlContent += `
        <div class="col-xl-2">
          <div class="partners_logo">
            <img src="${element.image}" alt="Partner's logo">
          </div>
        </div>`;
    });
    partnersRow.innerHTML = htmlContent;
  } else {
    console.log("Not found");
  }
};

getAPIdataWithAxios("/partners", addPartnerLogoData);
