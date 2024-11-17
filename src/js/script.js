const myURL = "http://localhost:3000";
const axiosInstance = axios.create({
  baseURL: myURL,
  timeout: 1000,
});

const getAPIdataWithAxios = async (url, cb) => {
  axiosInstance
    .get(url)
    .then((response) => {
      console.log(response);
      cb(response.data);
    })
    .catch((error) => console.log("Error fetching data:", error));
};

const partnersRow = document.getElementById("partners-row");
const benefitsCards = document.getElementById("benefits-cards");
const categoriesCards = document.getElementById("categories-cards");
const faqRow = document.getElementById("faq-row");
const feautredCourses = document.getElementById("courses");

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

const addBenefitCardData = (data) => {
  if (data && benefitsCards) {
    let htmlContent = "";
    data.forEach((element) => {
      htmlContent += `<div class="col-xl-6 col-md-12 col-sm-12">
                            <div class="right_side">
                                <div class="right_side__logo" style="background-image: url('${element["bg-im"]}');">
                                    <img src="${element.icon}">
                                </div>
                                <div class="right_side__body">
                                    <h4>${element.benefit}</h4>
                                    <p>${element.description}</p>
                                </div>
                            </div>
                        </div>`;
    });
    benefitsCards.innerHTML = htmlContent;
  }
};

const addCategorieCardData = (data) => {
  if (data && categoriesCards) {
    let htmlContent = "";
    data.forEach((element) => {
      htmlContent += ` <div class="col-xl-4">
                    <div class="categorie_card">
                        <div class="categorie_card__icon" style = "background-color: ${element.bgColor}
                        ">
                            <img
                                src="${element.icon}">
                        </div>
                        <div class="categorie_card__text">
                            <h3>${element.name}</h3>
                            <p>${element.count}</p>
                        </div>
                        <div class="categorie_card__link">
                            <a href="#">View Lessons <i class="ri-arrow-right-s-line"></i></a>
                        </div>
                    </div>
                </div>`;
      categoriesCards.innerHTML = htmlContent;
    });
  }
};

const addFaqData = (data) => {
  if (data && faqRow) {
    let htmlContent = "";
    data.forEach((element) => {
      htmlContent += `<div class="faq_accordion">
                        <div class="faq_accordion__question">
                            <h3>${element.question}
                            </h3>
                            <i class="ri-arrow-down-s-line"></i>
                        </div>
                        <div class="faq_accordion__answer">
                            <p>${element.answer}</p>
                        </div>
                    </div>`;
    });
    faqRow.innerHTML = htmlContent;
    const faqItem = faqRow.querySelectorAll(".faq_accordion");

    faqItem.forEach((faq) => {
      faq.addEventListener("click", () => {
        faq.classList.toggle("active");
      });
    });
  }
};

const addFeauturedCardsData = (data) => {
  if (data && feautredCourses) {
    let htmlContent = "";
    data.forEach((element) => {
      htmlContent += `<div class="col-xl-4">
                    <div class="featured_courses__card">
                        <div class="featured_courses__card__img">
                            <img
                                src="${element.image}">
                        </div>
                        <div class="featured_courses__card__reviews">
                            <ul>
                                <li><i class="ri-star-line"></i></li>
                                <li><i class="ri-star-line"></i></li>
                                <li><i class="ri-star-line"></i></li>
                                <li><i class="ri-star-line"></i></li>
                                <li><i class="ri-star-line"></i></li>
                            </ul>
                        </div>
                        <div class="featured_courses__card__body">
                            <h4>${element.name}</h4>
                            <p><span>In </span>${element.keywords}</p>
                        </div>
                        <div class="featured_courses__card__enroll">
                            <p>Free</p>
                            <a href="#"><i class="ri-layout-grid-line"></i> Get Enrolled</a>
                        </div>
                    </div>
                </div>`;
    });
    feautredCourses.innerHTML = htmlContent;
  }
};

getAPIdataWithAxios("/partners", addPartnerLogoData);
getAPIdataWithAxios("/benefits", addBenefitCardData);
getAPIdataWithAxios("/categories", addCategorieCardData);
getAPIdataWithAxios("/FAQs", addFaqData);
getAPIdataWithAxios("/courses", addFeauturedCardsData);
