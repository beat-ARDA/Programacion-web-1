/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.PublicacionDAO;
import Model.Publicacion;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Objects;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "InsertarPublicacion", urlPatterns = {"/InsertarPublicacion"})
public class InsertarPublicacion extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        PublicacionDAO publicacionDao = new PublicacionDAO();

        int idusuarios = Integer.parseInt(request.getParameter("idusuarios"));
        String descripcion = request.getParameter("descripcion");
        String imagen = request.getParameter("imagen");
        String texto = request.getParameter("texto");
        String titulo = request.getParameter("titulo");
        String _spoiler = request.getParameter("spoiler");
        int spoiler = 1;

        if (Objects.isNull(_spoiler)) {
            spoiler = 0;
        }

        Publicacion publicacion = new Publicacion(idusuarios, descripcion, imagen, texto, titulo, spoiler, 0, 0);

        if (publicacionDao.insertPublicacion(publicacion)) {
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
