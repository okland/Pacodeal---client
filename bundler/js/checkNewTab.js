/**
 * Created with JetBrains WebStorm.
 * User: OmriKlinger
 * Date: 28/10/12
 * Time: 11:27
 * To change this template use File | Settings | File Templates.
 */
if (localStorage.getItem('defaultNewTabFlag') == "true") {
    document.location.href = "chrome-internal://newtab/";
}
