/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.UsuarioDAO;
import Model.Usuarios;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.File;
import java.util.HashMap;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "ActualizarUsuario", urlPatterns = {"/ActualizarUsuario"})
@MultipartConfig(maxFileSize = 16177216)
public class ActualizarUsuario extends HttpServlet {

    private String extractExtension(Part part) {
        String content = part.getHeader("content-disposition");
        String[] items = content.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                String filename = s.substring(s.indexOf("=") + 2, s.length() - 1);
                if (filename.isEmpty() || filename.isBlank()) {
                    return filename;
                }
                String subs = "";
                subs = filename.substring(filename.indexOf("."), filename.length());
                return subs;
            }
        }
        return "";
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        UsuarioDAO usuarioDao = new UsuarioDAO();

        String uploadPath = getServletContext().getRealPath("/usuariosImg/");

        File fdir = new File(uploadPath);
        boolean comprobar = false;
        comprobar = fdir.exists();
        if (!comprobar) {
            fdir.mkdir();
        }
        String username = request.getParameter("username");

        String nombres = request.getParameter("nombres");
        String apellidos = request.getParameter("apellidos");
        String fechaNacimiento = request.getParameter("fecha-nacimiento");
        String correoElectronico = request.getParameter("correo-electronico");
        Part imagen = request.getPart("imagen-perfil");
        String usuario = request.getParameter("nombre-usuario");
        String contraseña = request.getParameter("contrasenia");

        String foto = "";
        String imagenVacio = extractExtension(imagen);
        if (!imagenVacio.isBlank() && !imagenVacio.isEmpty()) {
            String nombreArchivo = String.valueOf(System.currentTimeMillis());
            imagen.write(uploadPath + "/" + nombreArchivo + extractExtension(imagen));

            foto = "usuariosImg/" + nombreArchivo + extractExtension(imagen);
        }

        Usuarios _usuario = new Usuarios(usuario, nombres, apellidos,
                contraseña, correoElectronico, foto, fechaNacimiento);

        if (usuarioDao.updateUser(_usuario, username)) {
            resultado.put("resultado", true);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }

}
