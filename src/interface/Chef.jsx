import "../Chef.css";


function Chef() {
  return (
    <div className="chefsty">
      <h1>Bienvenue sur la page du Chef de Département.</h1>
      <table>
        <tr>
          <td>
            <p>importer les nom des etudiant</p>
          </td>
          <td>
            <input type="file" name="nom des estudiant" id="" />
          </td>
        </tr>
        <tr>
          <td>
            <p>importer les nom des enseignant</p>
          </td>
          <td>
            <input type="file" name="nom des enseignant" id="" />
          </td>
        </tr>
      </table>
    </div>
  )
}
export default Chef;