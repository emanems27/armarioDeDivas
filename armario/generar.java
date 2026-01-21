import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Generar {
    public static void main(String[] args) {
        File assetsRoot = new File("assets");

        if (!assetsRoot.exists() || !assetsRoot.isDirectory()) {
            System.out.println("❌ No se encontró la carpeta 'assets'");
            return;
        }

        File[] subfolders = assetsRoot.listFiles(File::isDirectory);

        if (subfolders != null) {
            for (File folder : subfolders) {
                List<String> validFiles = new ArrayList<>();
                File[] files = folder.listFiles();

                if (files != null) {
                    for (File f : files) {
                        String name = f.getName().toLowerCase();
                        if (name.endsWith(".png") || name.endsWith(".jpg") || 
                            name.endsWith(".jpeg") || name.endsWith(".avif")) {
                            // Guardamos la ruta relativa exacta que espera tu HTML
                            validFiles.add("assets/" + folder.getName() + "/" + f.getName());
                        }
                    }
                }

                if (!validFiles.isEmpty()) {
                    saveJson(new File(folder, "files.json"), validFiles);
                    System.out.println("✅ Generado files.json en: " + folder.getName());
                }
            }
        }
    }

    private static void saveJson(File outFile, List<String> data) {
        try (FileWriter writer = new FileWriter(outFile)) {
            writer.write("[\n");
            for (int i = 0; i < data.size(); i++) {
                writer.write("  \"" + data.get(i) + "\"" + (i < data.size() - 1 ? "," : "") + "\n");
            }
            writer.write("]");
        } catch (IOException e) {
            System.out.println("❌ Error al escribir JSON: " + e.getMessage());
        }
    }
}
