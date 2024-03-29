package Interfaces;

import Model.Usuarios;
import java.util.List;

/**
 *
 * @author e-arduron
 */
public interface UserCRUD {

    public List selectUsuarios();

    public Usuarios Log(Usuarios user);

    public Usuarios getUserId(Usuarios user);

    public Usuarios getUserData(Usuarios user);

    public Usuarios getUser(Usuarios user);

    public boolean insertUser(Usuarios usuario);

    public boolean updateUser(Usuarios usuario, String username);

    public boolean deleteUser(Usuarios usuario);
}
