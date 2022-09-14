package Interfaces;

import Model.Usuarios;
import java.util.List;

/**
 *
 * @author e-arduron
 */
public interface UserCRUD {

    public List selectUsuarios();

    public boolean insertUser(Usuarios usuario);

    public boolean updateUser(Usuarios usuario);

    public boolean deleteUser(Usuarios usuario);
}
