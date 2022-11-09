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

    public int selectCount();

    public Publicacion selectPublicacionUsuario(Publicacion user);

    public List selectPublicacionesUsuario(Usuarios user, int initialLimit, int nextLimit);

    public int insertPublicacion(Publicacion publicacion);

    public boolean updatePublicacion(Publicacion publicacion, Publicacion id);

    public boolean deletePublicacion(Publicacion publicacion);

    public List selectPublicaciones(int initialLimit, int nextLimit);

    public List searchPublicaciones(String valorBusqueda, int initialLimit, int nextLimit);
}
