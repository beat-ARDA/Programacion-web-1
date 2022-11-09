/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.UsuarioDAO;
import Model.Usuarios;
import com.google.gson.Gson;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.HashMap;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "ObtenerUsuarioInfo", urlPatterns = {"/ObtenerUsuarioInfo"})
public class ObtenerUsuarioInfo extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        UsuarioDAO userDao = new UsuarioDAO();
        String usuario = request.getParameter("usuario");
        Usuarios user = new Usuarios(usuario);

        Usuarios respuestaUsuario = userDao.getUser(user);

        if (respuestaUsuario != null) {
            resultado.put("resultado", respuestaUsuario);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }
}
