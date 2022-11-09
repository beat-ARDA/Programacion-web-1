/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author e-arduron
 */
public class VotoPublicacion {

    private int id, idUsuario, idPublicacion;

    public VotoPublicacion() {
    }

    public VotoPublicacion(int id, int idUsuario, int idPublicacion) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idPublicacion = idPublicacion;
    }

    public VotoPublicacion(int idUsuario, int idPublicacion) {
        this.idUsuario = idUsuario;
        this.idPublicacion = idPublicacion;
    }

    public VotoPublicacion(int idPublicacion) {
        this.idPublicacion = idPublicacion;
    }

    public int getId() {
        return id;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public int getIdPublicacion() {
        return idPublicacion;
    }

}
