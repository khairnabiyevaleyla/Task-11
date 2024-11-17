const myURL = "http://localhost:3000";
const axiosInstance = axios.create({
  baseURL: myURL,
  timeout: 1000,
});

const partnersUrl = "/partners";
const benefitUrl = "/benefits";

const categoriesUrl = "/categories"; // Endpoint for categories
const coursesUrl = "/courses"; // Endpoint for courses

const AdminCategoryDataTables = document.querySelector("#admin-categories");
const CategoryFormSubmit = document.querySelector("#category-form-submit");

const AdminCourseDataTables = document.querySelector("#admin-courses");
const CourseFormSubmit = document.querySelector("#course-form-submit");

const AdminPartnerLogosDataTables = document.querySelector(
  "#admin-partner-logos"
);
const PartnerLogoFormSubmit = document.querySelector(
  "#partner-logo-form-submit"
);

const AdminBenefitDataTables = document.querySelector("#admin-benefits");
const BenefitFormSubmit = document.querySelector("#benefit-form-submit");

const PartnerLogoFormImage = document.querySelector("#logo-image");

const getAPIdataWithAxios = async (url, cb) => {
  axiosInstance
    .get(url)
    .then((response) => {
      console.log(response);
      cb(response.data);
    })
    .catch((error) => console.log("Error fetching data:", error));
};

const postDataJson = async (url, payload) => {
  console.log(url);
  console.log(payload);
  axiosInstance.post(url, payload).then((response) => {
    getAPIdataWithAxios(url);
  });
};

const patchDataJson = async (url, query, payload) => {
  axiosInstance.patch(url + query, payload).then((response) => {
    getAPIdataWithAxios(url);
  });
};

// const UpdateSHowOrHiddenFUnc = (UpdateEl, url, item) => {
//   UpdateEl &&
//     UpdateEl.forEach((element, index) => {
//       element.addEventListener("click", (e) => {
//         const id = e.target.id;
//         patchJson(`/${url}/${id}`, {
//           show: Boolean(!item[index].show),
//         });
//       });
//     });
// };

PartnerLogoFormSubmit &&
  PartnerLogoFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit");
    let fileReader = new FileReader();

    let PartnerLogoFormImage = document.querySelector("#logo-image");
    if (PartnerLogoFormImage.files[0] == null) {
      alert("No file selected");
    } else {
      fileReader.readAsDataURL(PartnerLogoFormImage.files[0]);
    }

    fileReader.onload = () => {
      let payload = {
        id: crypto.randomUUID(),
        image: fileReader.result,
      };

      postDataJson(partnersUrl, payload);
    };
  });

BenefitFormSubmit &&
  BenefitFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    let icon = document.querySelector("#benefit-icon");
    let bgImage = document.querySelector("#benefit-background");

    if (icon.files[0] == null) {
      alert("No icon file selected");
      return;
    }
    if (bgImage.files[0] == null) {
      alert("No background image file selected");
      return;
    }
    let iconReader = new FileReader();
    let bgReader = new FileReader();

    iconReader.readAsDataURL(bgImage.files[0]);

    bgReader.readAsDataURL(bgImage.files[0]);

    let iconData, bgData;

    iconReader.onload = () => {
      iconData = iconReader.result;

      bgReader.onload = () => {
        bgData = bgReader.result;
        let payload = {
          id: crypto.randomUUID(),
          description: document.getElementById("benefit-description").value,
          benefit: document.getElementById("benefit-name").value,
          icon: iconData,
          "bg-im": bgData,
        };

        postDataJson(benefitUrl, payload);
      };
    };
  });

CategoryFormSubmit &&
  CategoryFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    const categoryName = document.getElementById("category-name").value;
    const categoryCount = document.getElementById("category-count").value;
    const categoryIcon = document.getElementById("category-icon").value;
    const categoryBgColor = document.getElementById("category-bgColor").value;

    if (!categoryName || !categoryCount || !categoryIcon || !categoryBgColor) {
      alert("All fields are required!");
      return;
    }

    const payload = {
      id: crypto.randomUUID(),
      name: categoryName,
      count: categoryCount,
      icon: categoryIcon,
      bgColor: categoryBgColor,
    };

    postDataJson(categoriesUrl, payload);
  });

CourseFormSubmit &&
  CourseFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    const courseName = document.getElementById("course-name").value;
    const courseKeywords = document.getElementById("course-keywords").value;
    const courseImage = document.getElementById("course-image").value;

    if (!courseName || !courseKeywords || !courseImage) {
      alert("All fields are required!");
      return;
    }

    const payload = {
      id: crypto.randomUUID(),
      name: courseName,
      keywords: courseKeywords,
      image: courseImage,
    };

    postDataJson(coursesUrl, payload);
  });
PartnerLogoFormSubmit &&
  PartnerLogoFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit");
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let payload = {
        id: crypto.randomUUID(),
        image: fileReader.result,
      };

      postDataJson(partnersUrl, payload);
    };

    console.log(PartnerLogoFormImage.files[0]);

    if (PartnerLogoFormImage.files[0] == null) {
      alert("No file selected");
    } else {
      fileReader.readAsDataURL(PartnerLogoFormImage.files[0]);
    }
  });

///////////////////////////////////////////////////////////////////////////

////////Modal
const myModal = document.getElementById("partner-modal");
const myInput = document.getElementById("partner-logo-form-submit");

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});

const benefitModal = document.getElementById("benefit-modal");
const benefitInput = document.getElementById("benefit-form-submit");

benefitModal.addEventListener("shown.bs.modal", () => {
  benefitInput.focus();
});

///////////////////////////////////////////////////////////////////////////

//////Rendering

const renderPartnerLogoAdminTables = (data) => {
  console.log(data);
  data &&
    data.forEach((element, index) => {
      AdminPartnerLogosDataTables.innerHTML += ` 
    <tr>
        <th scope="row">${index + 1}</th>
        <td>
          <img class="admin-img" src="${
            element?.image
          }" style="width:120px; height:50px;"/>
        </td>
        <td>
          <button id="${
            element.id
          }" class="btn btn-danger btn-sm delete">Delete</button>
        </td>
      </tr>`;
    });

  const deletes = document.querySelectorAll(".delete");
  deletes &&
    deletes.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        console.log(e);
        e.preventDefault();
        const id = e.target.id;
        axiosInstance.delete(`${partnersUrl}/${id}`).then((response) => {
          getAPIdataWithAxios(partnersUrl);
        });
      });
    });
};

const renderBenefitAdminTables = (data) => {
  data &&
    data.forEach((element, index) => {
      AdminBenefitDataTables.innerHTML += ` <tr>
              <th scope="row">${++index}</th>
                            <td>
              <img class="admin-img" src="${element?.icon}" />
              </td>
              <td>
              <img class="admin-img" src="${element["bg-im"]}" />
              </td>
              <td>
              ${element?.benefit}
              </td>

              <td>
              ${element?.description}"
              </td>
              <td>
                <button id=${
                  element.id
                }  class="btn btn-danger delete">Delete</button>
              </td>
            </tr>`;
    });

  const deletes = document.querySelectorAll(".delete");
  deletes &&
    deletes.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        console.log(e);
        e.preventDefault();
        const id = e.target.id;
        axiosInstance.delete(`${benefitUrl}/${id}`).then((response) => {
          getAPIdataWithAxios(benefitUrl);
        });
      });
    });
};

const renderCategoryAdminTables = (data) => {
  AdminCategoryDataTables.innerHTML = "";
  data &&
    data.forEach((element, index) => {
      AdminCategoryDataTables.innerHTML += `
                <tr>
                    <th scope="row">${++index}</th>
                    <td><img class="admin-img" src="${element.icon}" alt="${
        element.name
      } Icon" style="width: 30px; height: 30px;"></td>
                    <td>${element?.name}</td>
                    <td>${element?.count}</td>
                    <td>
                        <button id=${
                          element.id
                        } class="btn btn-danger delete">Delete</button>
                    </td>
                </tr>`;
    });

  // Add delete functionality
  const deletes = document.querySelectorAll(".delete");
  deletes.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.id;
      axiosInstance.delete(`${categoriesUrl}/${id}`).then(() => {
        getAPIdataWithAxios(categoriesUrl, renderCategoryAdminTables);
      });
    });
  });
};

const renderCourseAdminTables = (data) => {
  AdminCourseDataTables.innerHTML = "";
  data &&
    data.forEach((element, index) => {
      AdminCourseDataTables.innerHTML += `
                <tr>
                    <th scope="row">${++index}</th>
                    <td><img class="admin-img" src="${element.image}" alt="${
        element.name
      } Image" style="width: 50px; height: 50px;"></td>
                    <td>${element?.name}</td>
                    <td>${element?.keywords}</td>
                    <td>
                        <button id=${
                          element.id
                        } class="btn btn-danger delete">Delete</button>
                    </td>
                </tr>`;
    });

  // Add delete functionality
  const deletes = document.querySelectorAll(".delete");
  deletes.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.id;
      axiosInstance.delete(`${coursesUrl}/${id}`).then(() => {
        getAPIdataWithAxios(coursesUrl, renderCourseAdminTables);
      });
    });
  });
};

///////////////////////////////////////////////////////////////////////////////////

getAPIdataWithAxios(partnersUrl, (data) => {
  AdminPartnerLogosDataTables && renderPartnerLogoAdminTables(data);
});

const faqsUrl = "/FAQs";

const AdminFAQsDataTables = document.querySelector("#admin-faqs");
const faqsFormSubmit = document.querySelector("#faqs-form-submit");
const questionFormImage = document.querySelector("#question");
const answerFormImage = document.querySelector("#answer");

faqsFormSubmit &&
  faqsFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit");
    const payload = {
      question: questionFormImage.value,
      answer: answerFormImage.value,
    };
    postDataJson(faqsUrl, payload);
  });

getAPIdataWithAxios(benefitUrl, (data) => {
  AdminBenefitDataTables && renderBenefitAdminTables(data);
});

getAPIdataWithAxios(categoriesUrl, (data) => {
  AdminCategoryDataTables && renderCategoryAdminTables(data);
});

getAPIdataWithAxios(coursesUrl, (data) => {
  AdminCourseDataTables && renderCourseAdminTables(data);
});

const renderFAQsAdminTables = (data) => {
  console.log(data);
  data &&
    data.forEach((element, index) => {
      AdminFAQsDataTables.innerHTML += ` 
      <tr>
          <th scope="row">${index + 1}</th>
         <td style="font-size: 12px;">
  ${element.question}
</td>
          <td style="font-size: 12px;">
              ${element.answer}
          </td>
          <td>
            <button id="${
              element.id
            }" class="btn btn-danger btn-sm delete-faqs">Delete</button>
          </td>
        </tr>`;
    });

  const deleteFAQs = document.querySelectorAll(".delete-faqs");
  deleteFAQs &&
    deleteFAQs.forEach((faq, index) => {
      faq.addEventListener("click", (e) => {
        console.log(e);
        e.preventDefault();
        const id = e.target.id;
        axiosInstance.delete(`${faqsUrl}/${id}`).then((response) => {
          getAPIdataWithAxios(faqsUrl);
        });
      });
    });
};

getAPIdataWithAxios(faqsUrl, (data) => {
  AdminFAQsDataTables && renderFAQsAdminTables(data);
});
