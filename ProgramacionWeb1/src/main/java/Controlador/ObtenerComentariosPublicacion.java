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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "ObtenerComentariosPublicacion", urlPatterns = {"/ObtenerComentariosPublicacion"})
public class ObtenerComentariosPublicacion extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Comentarios> listaComentarios = new ArrayList<Comentarios>();
        HashMap resultado = new HashMap();
        ComentariosDAO comentarioDao = new ComentariosDAO();

        int idPublicacion = Integer.parseInt(request.getParameter("idPublicacion"));

        Comentarios _comentario = new Comentarios(
                idPublicacion
        );

        listaComentarios = comentarioDao.GetComentarios(_comentario);

        if (listaComentarios != null) {
            resultado.put("resultado", listaComentarios);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }
}
