// ce que j'envoie comme reponse aux routes
const somme = (req, res) => {
    const somme = 100 + 1;
    res.send(
        {somme : somme}
    )
}

export default {
    somme
}

