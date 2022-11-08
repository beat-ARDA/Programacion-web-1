/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author e-arduron
 */
public class Etiqueta {

    private int id;
    private String etiqueta;

    public Etiqueta() {
    }

    public Etiqueta(int id, String etiqueta) {
        this.id = id;
        this.etiqueta = etiqueta;
    }

    public Etiqueta(int id) {
        this.id = id;
    }

    public Etiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public int getId() {
        return id;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

}
