/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author e-arduron
 */
public class Comentarios {
    private int id, idPub, idUsu;
    private String comentario;

    public Comentarios() {
    }

    public Comentarios(int id, int idPub, int idUsu, String comentario) {
        this.id = id;
        this.idPub = idPub;
        this.idUsu = idUsu;
        this.comentario = comentario;
    }

    public Comentarios(int idPub, int idUsu, String comentario) {
        this.idPub = idPub;
        this.idUsu = idUsu;
        this.comentario = comentario;
    }

    public Comentarios(int idPub, int idUsu) {
        this.idPub = idPub;
        this.idUsu = idUsu;
    }

    public Comentarios(int idPub) {
        this.idPub = idPub;
    }

    public int getId() {
        return id;
    }

    public int getIdPub() {
        return idPub;
    }

    public int getIdUsu() {
        return idUsu;
    }

    public String getComentario() {
        return comentario;
    }
    
    
}
