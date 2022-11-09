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
@WebServlet(name = "InsertarComentario", urlPatterns = {"/InsertarComentario"})
public class InsertarComentario extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        ComentariosDAO comentariosDao = new ComentariosDAO();

        String comentario = request.getParameter("comentario");
        int idPublicacion = Integer.parseInt(request.getParameter("idPublicacion"));
        int idUsuario = Integer.parseInt(request.getParameter("idUsuario"));

        Comentarios _comentario = new Comentarios(
                idPublicacion,
                idUsuario,
                comentario
        );

        if (comentariosDao.insertComentario(_comentario)) {
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
