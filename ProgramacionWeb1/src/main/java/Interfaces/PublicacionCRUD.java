package Interfaces;

import Model.Publicacion;
import Model.Usuarios;
import java.util.List;

/**
 *
 * @author e-arduron
 */
public interface PublicacionCRUD {
    
    public int selectCount(Usuarios user);

    public Publicacion selectPublicacionUsuario(Publicacion user);

    public List selectPublicacionesUsuario(Usuarios user, int initialLimit, int nextLimit);

    public boolean insertPublicacion(Publicacion publicacion);

    public boolean updatePublicacion(Publicacion publicacion, Publicacion id);

    public boolean deletePublicacion(Publicacion publicacion);
}
