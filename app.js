import { personalDevelopmentBooks } from "./personalDevelopmentBooks.js";


console.table(personalDevelopmentBooks);


/* ----- AFFICHAGE DES DONNÉES DANS LE CODE HTML ----- */
/* --------------------------------------------------- */
//#region
function fetchAllBooks(personalDevelopmentBooks) {
    /* Récupération de l'élément à remplir (parent) - Ici le tableau est vide, seuls les intitulés des colonnes sont indiqués */
    const elApp = document.getElementsByTagName("tbody")[0];
    /* En attribuant "" à l'élément précédemment sélectionné, on s'assure de tout supprimer */
    elApp.innerHTML = "";

    let data = "";
    /* Récupération des données - On stocke dans la variable 'data' le code html concaténé à l'aide des littéraux de gabarits / backtick ` (templates literals).
    */
    personalDevelopmentBooks.forEach((eltBook, index) => {
        data += `<tr>
        <td>${eltBook.title}</td>
        <td>${eltBook.year}</td>
        <td>${eltBook.author}</td>
        <td>${eltBook.edition}</td>
        <td>${eltBook.theme}</td>
        <td>
            <button class="edit btn btn-sm btn-outline-success" value="${index}">Modifier</button>
            <button class="delete btn btn-sm btn-outline-danger" value="${index}">Supprimer</button>
        </td>
        </tr>`;
    });

    /* Message en cas de résultat */
    if (data.length > 0) {
        /* Affichage des données dans le tableau */
        elApp.innerHTML += data;
    } else {
        /* Aucune donnée */
        elApp.innerHTML += "<p>Aucune ligne trouvée</p>";
    }

    /* Ajout d'un écouteur d'event sur le bouton d'action "MODIFIER" */
    document.querySelectorAll("button.edit").forEach(btn => {
        btn.addEventListener("click", function () {
            return editBook(this.value);
        });
    });

    /* Ajout d'un écouteur d'event sur le bouton d'action "Supprimer" */
    document.querySelectorAll("button.delete").forEach(btn => {
        btn.addEventListener("click", function () {
            return deleteBook(this.value);
        });
    });
}

fetchAllBooks(personalDevelopmentBooks);
//#endregion

/* ----- RECHERCHE PAR TITRE DE FILMS ----- */
/* ----------------------------------------- */
//#region 
/* 1. Ajout d'un eventListener lors de la saisie de texte dans le champs de recherche */
document
    .querySelectorAll("input[type=search]")[0] /* Indication sur le type d'input recherché */
    .addEventListener("input", search); /* Ajout d'un event sur l'input et application de la fonction search */

/* 2. Fonction search */
function search() {
    // console.log(this.value); >> affiche en console chaque lettre saisie dans le champs de recherche 
    /* Pour trouver une ou plusieurs lignes, on utilise la fonction 'filter' qui permet de rechercher des éléments dans un tableau */
    const filteredData = personalDevelopmentBooks.filter(book =>
        book.title.toLowerCase().includes(this.value.toLowerCase()) /* la fonction 'toLowerCase' permet de convertir une chaîne en lettres minuscules. La fonction 'includes' permet de recherche des caractères dans une chaine de caractères en retournant un booléen */
    );
    fetchAllBooks(filteredData); /* Appel de la fonction avec les résultats filtrés */
}
//#endregion


/* ----- PREPARATION DU FORMULAIRE D'AJOUT D'UN LIVRE ----- */
/* ------------------------------------- */
//#region
/* Par défaut, le formulaire n'est pas visible */
const elForm = document.getElementById("form");
elForm.style.display = "none"; /* Le formulaire ne s'affiche pas grâce à la propriété CSS display: none */
const elContent = document.getElementById("table"); /* Ciblage de la div contenant tout le contenu de l'application */
//#endregion


/* ----- AFFICHAGE DU FORMULAIRE ----- */
/* ----------------------------------- */
//#region
/* Ajout d'un eventListerner au clic sur le bouton d'ajout et appel de la fonction displayForm() */
document
    .getElementById("form-add")
    .addEventListener("click", function () {
        displayForm();
    });

/* Fonction qui permet d'afficher le formulaire d'ajout et de masquer le reste du contenu (tableau) au clic sur le bouton d'ajout d'un book */
function displayForm() {
    elForm.style.display = "block";
    elContent.style.display = "none";
}
//#endregion

/* ----- AJOUT D'UNE LIGNE ----- */
/* ----------------------------- */
//#region
/* Ajout d'un eventListener au clic sur le bouton d'enregistrement du formulaire */
document
    .getElementById("form-save")
    .addEventListener("click", function () {

        /* Récupération des champs */
        const title = document.getElementById("title").value;
        const year = document.getElementById("year").value;
        const author = document.getElementById("author").value;
        const edition = document.getElementById("edition").value;
        const theme = document.getElementById("theme").value;

        console.log("------------------------");
        console.log("TITLE", title);
        console.log("YEAR", year);
        console.log("AUTHOR", author);
        console.log("EDITION", edition);
        console.log("THEME", theme);
        console.log("------------------------");

        /* CONDITION - Si les 5 champs sont remplis */
        if (title && year && author && edition && theme) {
            /* Nouvelle ligne */
            const book = {
                title: title,
                year: year,
                author: author,
                edition: edition,
                theme: theme
            };

            /* Ajout de la nouvelle ligne dans le tableau */
            // personalDevelopmentBooks.push(book); // Ancienne version
            if (document.getElementById("hidden").value.length > 0) {
                /* La méthode splice permet de modifier des éléments dans un tableau (ajout ou suppression) */
                personalDevelopmentBooks.splice(document.getElementById("hidden").value, 1, book);
            } else {
                /* la méthode push permet de pousser/enregistrer les nouvelles données dans le tableau */
                personalDevelopmentBooks.push(book);
            }
        }

        /* Appel de la fonction hideForm pour cacher le formulaire et permettre ensuite d'afficher tous les livres dans le return */
        hideForm();

        /* Affichage du nouveau tableau */
        return fetchAllBooks(personalDevelopmentBooks);
    });


/* le code précédent ne permet pas d'afficher les données saisies dans le tableau et celles-ci restent dans le formulaire. 
Pour y remédier, on créé la fonction hideForm pour cacher le formulaire une fois qu'on a cliqué sur le bouton d'enregistrement */
function hideForm() {
    elForm.style.display = "none";
    elContent.style.display = "block";

    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("author").value = "";
    document.getElementById("edition").value = "";
    document.getElementById("theme").value = "";
    document.getElementById("hidden").value = "";
}


/* Ajout d'un eventListener au clic sur le bouton d'annulation du formulaire - N'est effectif que si le formaulaire n'est pas encore soumis - On souhaite juste effacer les données saisies dans le formulaire */
document
    .getElementById("form-cancel")
    .addEventListener("click", function () {
        /* Appel et exécution de la fonction qui permet de vider les champs saisis avant la soumission du formulaire */
        hideForm()
    });
//#endregion


/* ----- MODIFICATION D'UNE LIGNE ----- */
/* ------------------------------------ */
//#region
function editBook(index) {
    /* Récupération de la ligne de l'élément cible via son index grâce à la méthode find */
    const book = personalDevelopmentBooks.find((eltBook, i) => {
        return i == index;
    });

    /* Alimentation des champs */
    document.getElementById("title").value = book.title;
    document.getElementById("year").value = book.year;
    document.getElementById("author").value = book.author;
    document.getElementById("edition").value = book.edition;
    document.getElementById("theme").value = book.theme;
    document.getElementById("hidden").value = index;

    displayForm();
}
//#endregion


/* ----- SUPPRESSION D'UNE LIGNE ----- */
/* ------------------------------------ */
//#region
function deleteBook(index) {
    /* Si l'utilisateur clique sur 'ok', alors l'élément cible via l'index du bouton est supprimé du tableau grâce à la méthode splice */
    if (confirm("Confirmez-vous la suppression de ce film ?")) {
        personalDevelopmentBooks.splice(index, 1);
        console.log("Mise à jour du tableau après la suppression d'un élément", personalDevelopmentBooks);
        fetchAllBooks(personalDevelopmentBooks);
    }
};
//#endregion