/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.ComentariosDAO;
import Model.Comentarios;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "ObtenerCantidadComentarios", urlPatterns = {"/ObtenerCantidadComentarios"})
public class ObtenerCantidadComentarios extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        ComentariosDAO comentariosDao = new ComentariosDAO();
        int cantidad = 0;

        int idPublicacion = Integer.parseInt(request.getParameter("idPublicacion"));
        Comentarios comentario = new Comentarios(idPublicacion);

        cantidad = comentariosDao.GetCountComentarios(comentario);

        if (cantidad > 0) {
            resultado.put("resultado", cantidad);
        } else {
            resultado.put("resultado", 0);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }
}
