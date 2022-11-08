package Interfaces;

import Model.EtiquetaPublicacion;
import java.util.List;

public interface EtiquetaPublicacionCRUD {

    public boolean insertEtiquetaPublicacion(EtiquetaPublicacion etiquetaPublicacion);

    public List selectEtiquetasId(EtiquetaPublicacion etiquetaPublicacion);

    public boolean deleteEtiquetaPublicacion(EtiquetaPublicacion etiquetaPublicacion);
}
