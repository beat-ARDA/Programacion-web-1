/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author e-arduron
 */
public class Usuarios {

    private int idusuario;
    private String username, nombre, apellidos, contraseña, correo_electronico, imagen_perfil, fechaNacimiento, fechaRegistro;

    public Usuarios() {
    }

    public Usuarios(int idusuario, String username, String nombre, String apellidos, String contraseña, String correo_electronico, String imagen_perfil, String fechaNacimiento, String fechaRegistro) {
        this.idusuario = idusuario;
        this.username = username;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.contraseña = contraseña;
        this.correo_electronico = correo_electronico;
        this.imagen_perfil = imagen_perfil;
        this.fechaNacimiento = fechaNacimiento;
        this.fechaRegistro = fechaRegistro;
    }

    public Usuarios(String username, String nombre, String apellidos, String contraseña, String correo_electronico, String imagen_perfil, String fechaNacimiento) {
        this.username = username;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.contraseña = contraseña;
        this.correo_electronico = correo_electronico;
        this.imagen_perfil = imagen_perfil;
        this.fechaNacimiento = fechaNacimiento;
    }

    public Usuarios(String username, String contraseña) {
        this.username = username;
        this.contraseña = contraseña;
    }

    public int getIdusuario() {
        return idusuario;
    }

    public String getUsername() {
        return username;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getContraseña() {
        return contraseña;
    }

    public String getCorreo_electronico() {
        return correo_electronico;
    }

    public String getImagen_perfil() {
        return imagen_perfil;
    }

    public String getFechaNacimiento() {
        return fechaNacimiento;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

}
