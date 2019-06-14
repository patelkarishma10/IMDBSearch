function makeRequest(method, url) {
    return new Promise(
        function (resolve, reject) {
            let req = new XMLHttpRequest();

            req.onload = function () {
                const data = JSON.parse(req.responseText);
                if (req.status >= 200 && req.status < 300) {
                    resolve(req.response);
                } else {
                    const reason = new Error('Rejected');
                    reject(reason);
                }
            };

            req.open(method, url);
            req.send();
        }
    );
}


function searchFilms() {
    let searchText = document.getElementById("searchFilm").value;

    makeRequest("GET", `http://www.omdbapi.com/?apikey=8f870038&s=${searchText}`)
        .then((data) => {

            const data2 = JSON.parse(data);
            console.log(data2.Search[0].Title);
            console.log(data2);
            console.log(data2.Search[0]);
            const container = document.getElementById('searchTable');

            for (let i = 0; i < 10; i++) {
                let myRow = document.createElement('tr');
                myRow.id = "row" + i;
                container.appendChild(myRow);

                let myTitle = document.createElement('td');
                myTitle.innerHTML = String(data2.Search[i].Title);
                myRow.appendChild(myTitle);

                let myYear = document.createElement('td');
                myYear.innerHTML = String(data2.Search[i].Year);
                myRow.appendChild(myYear);

                let myType = document.createElement('td');
                myType.innerHTML = String(data2.Search[i].Type);
                myRow.appendChild(myType);

                let myMoreDetail = document.createElement('td');
                myRow.appendChild(myMoreDetail);
                let moreInfobtn = document.createElement('input');
                moreInfobtn.type = "button";
                moreInfobtn.value = "More Detail";
//                let petid = newobj1[i]["id"];
//                moreInfobtn.onclick = (function () {
//                    return function () {
//                        getVisits(petid);
//                    }
//                })(newobj1[i]["id"]);
                myMoreDetail.appendChild(moreInfobtn);

            }

        })
        .catch((error) => console.log(error.message));
    return false;
}
