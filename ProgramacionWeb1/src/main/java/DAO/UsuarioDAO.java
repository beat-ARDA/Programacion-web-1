package DAO;

import Config.Conexion;
import Interfaces.UserCRUD;
import Model.Usuarios;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author e-arduron
 */
public class UsuarioDAO implements UserCRUD {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    Usuarios usuario;

    @Override
    public List selectUsuarios() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Usuarios Log(Usuarios user) {
        String sql = "select idusuarios, username, nombre, apellidos, fechaNacimiento, fechaRegistro, contraseña, correo_electronico, imagen_perfil from usuarios where username = '" + user.getUsername().trim() + "' AND contraseña = '" + user.getContraseña().trim() + "';";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            if (rs.next()) {
                usuario = new Usuarios(
                        rs.getString("username"),
                        rs.getString("nombre"), rs.getString("apellidos"), rs.getString("contraseña"),
                        rs.getString("correo_electronico"), rs.getString("imagen_perfil"),
                        rs.getString("fechaNacimiento"), rs.getString("fechaRegistro")
                );
            }

        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }

        return usuario;
    }

    @Override
    public boolean insertUser(Usuarios usuario) {
        String sql = "INSERT INTO usuarios\n"
                + " (\n"
                + "username,\n"
                + "nombre,\n"
                + "apellidos,\n"
                + "fechaNacimiento,\n"
                + "contraseña,\n"
                + "correo_electronico,\n"
                + "imagen_perfil)\n"
                + " VALUES\n"
                + " (\n"
                + "'" + usuario.getUsername() + "',\n"
                + "'" + usuario.getNombre() + "',\n"
                + "'" + usuario.getApellidos() + "',\n"
                + "'" + usuario.getFechaNacimiento() + "',\n"
                + "'" + usuario.getContraseña() + "',\n"
                + "'" + usuario.getCorreo_electronico() + "',\n"
                + "'" + usuario.getImagen_perfil() + "');";

        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);
            int resultado = ps.executeUpdate();

            if (resultado > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception ex) {
            System.out.print("Error " + ex);
            return false;
        }

    }

    @Override
    public boolean updateUser(Usuarios usuario) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean deleteUser(Usuarios usuario) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Usuarios getUserId(Usuarios user) {
        String sql = "select idusuarios from usuarios where username = '" + user.getUsername().trim() + "';";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            if (rs.next()) {
                usuario = new Usuarios(rs.getInt("idusuarios"));
            }
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return usuario;
    }

}
