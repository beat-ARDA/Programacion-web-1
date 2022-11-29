/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Interfaces;

import Model.Comentarios;
import java.util.List;

/**
 *
 * @author e-arduron
 */
public interface ComentariosCRUD {

    public boolean insertComentario(Comentarios comentario, int spoiler);

    public List GetComentarios(Comentarios comentario);

    public int GetCountComentarios(Comentarios comentario);

}
