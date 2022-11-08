/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author e-arduron
 */
public class EtiquetaPublicacion {

    int id, idPubli, idEtiqueta;

    public EtiquetaPublicacion() {
    }

    public EtiquetaPublicacion(int id, int idPubli, int idEtiqueta) {
        this.id = id;
        this.idPubli = idPubli;
        this.idEtiqueta = idEtiqueta;
    }

    public EtiquetaPublicacion(int idPubli, int idEtiqueta) {
        this.idPubli = idPubli;
        this.idEtiqueta = idEtiqueta;
    }

    public EtiquetaPublicacion(int idEtiqueta) {
        this.idEtiqueta = idEtiqueta;
    }

    public int getId() {
        return id;
    }

    public int getIdPubli() {
        return idPubli;
    }

    public int getIdEtiqueta() {
        return idEtiqueta;
    }

}
