/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "RevisarSesion", urlPatterns = {"/RevisarSesion"})
public class RevisarSesion extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        HashMap respuesta = new HashMap();

        if (session.getAttribute("usuario") != null) {
            respuesta.put("resultado", true);
        } else {
            respuesta.put("resultado", false);
        }

        String json = new Gson().toJson(respuesta);
        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }

}
