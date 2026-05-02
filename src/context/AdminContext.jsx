import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "retorno_admin_data";
const uid = () => `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

const DEFAULT_DATA = {
  courses: [
    {
      id: "course_1",
      title: "Árbol de la Vida",
      description: "Un recorrido profundo por la estructura del Árbol de la Vida en la Kabbalah. Exploramos cada Sefirot y su significado en el camino espiritual.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80",
      level: "Intermedio",
      active: true,
      createdAt: "2024-01-15T00:00:00.000Z",
      classes: [
        { id: "cls_1", title: "Introducción al Árbol de la Vida", videoUrl: "", duration: "52 min", order: 1 },
        { id: "cls_2", title: "Las Sefirot: Esferas de la Luz", videoUrl: "", duration: "58 min", order: 2 },
        { id: "cls_3", title: "Caminos y Senderos Internos", videoUrl: "", duration: "55 min", order: 3 },
      ],
    },
    {
      id: "course_2",
      title: "Introspección Profunda",
      description: "Meditación contemplativa para conectar con el silencio interior y desarrollar la observación de la mente.",
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&q=80",
      level: "Inicial",
      active: false,
      createdAt: "2024-02-01T00:00:00.000Z",
      classes: [],
    },
  ],
  content: {
    hero: {
      title: "Retorno a Casa",
      subtitle: "Un espacio de transformación interior, guiado por el conocimiento ancestral.",
    },
    entrenamiento: {
      title: "Entrenamiento",
      lead: "Programas diseñados para fortalecer el cuerpo, la mente y el espíritu.",
    },
    estudios: {
      title: "Estudios",
      lead: "Cursos y recursos para profundizar en el conocimiento espiritual y el autoconocimiento.",
    },
    introspeccion: {
      title: "Introspección",
      lead: "Herramientas prácticas para el desarrollo de la conciencia y el trabajo interior.",
    },
  },
  files: [],
};

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          courses: parsed.courses ?? DEFAULT_DATA.courses,
          content: { ...DEFAULT_DATA.content, ...parsed.content },
          files: parsed.files ?? DEFAULT_DATA.files,
        };
      }
    } catch {
      // fall through to default
    }
    return DEFAULT_DATA;
  });

  const [toast, setToast] = useState(null);

  // Persist every change to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // Can fail if localStorage is full (e.g., large base64 images)
      console.warn("Admin: no se pudo guardar:", e.message);
    }
  }, [data]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, key: uid() });
    setTimeout(() => setToast(null), 3200);
  }, []);

  // ── Courses ───────────────────────────────────────────────────────────────

  const addCourse = useCallback((courseData) => {
    setData((prev) => ({
      ...prev,
      courses: [
        ...prev.courses,
        { ...courseData, id: uid(), createdAt: new Date().toISOString(), classes: [] },
      ],
    }));
    showToast("Curso creado correctamente");
  }, [showToast]);

  const updateCourse = useCallback((id, courseData) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => (c.id === id ? { ...c, ...courseData } : c)),
    }));
    showToast("Curso actualizado");
  }, [showToast]);

  const deleteCourse = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.filter((c) => c.id !== id),
    }));
    showToast("Curso eliminado");
  }, [showToast]);

  const toggleCourse = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    }));
  }, []);

  // ── Classes ───────────────────────────────────────────────────────────────

  const addClass = useCallback((courseId, classData) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => {
        if (c.id !== courseId) return c;
        const newClass = { ...classData, id: uid(), order: c.classes.length + 1 };
        return { ...c, classes: [...c.classes, newClass] };
      }),
    }));
    showToast("Clase agregada");
  }, [showToast]);

  const updateClass = useCallback((courseId, classId, classData) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) =>
        c.id === courseId
          ? { ...c, classes: c.classes.map((cl) => (cl.id === classId ? { ...cl, ...classData } : cl)) }
          : c
      ),
    }));
    showToast("Clase actualizada");
  }, [showToast]);

  const deleteClass = useCallback((courseId, classId) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) =>
        c.id === courseId
          ? {
              ...c,
              classes: c.classes
                .filter((cl) => cl.id !== classId)
                .map((cl, i) => ({ ...cl, order: i + 1 })),
            }
          : c
      ),
    }));
    showToast("Clase eliminada");
  }, [showToast]);

  // Move a class up or down within its course
  const moveClass = useCallback((courseId, classId, direction) => {
    setData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => {
        if (c.id !== courseId) return c;
        const arr = [...c.classes];
        const idx = arr.findIndex((cl) => cl.id === classId);
        const swapIdx = direction === "up" ? idx - 1 : idx + 1;
        if (idx < 0 || swapIdx < 0 || swapIdx >= arr.length) return c;
        [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
        return { ...c, classes: arr.map((cl, i) => ({ ...cl, order: i + 1 })) };
      }),
    }));
  }, []);

  // ── Content sections ──────────────────────────────────────────────────────

  const updateContent = useCallback((section, sectionData) => {
    setData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: { ...prev.content[section], ...sectionData },
      },
    }));
    showToast("Contenido guardado");
  }, [showToast]);

  // ── Files ──────────────────────────────────────────────────────────────────

  const addFile = useCallback((fileData) => {
    setData((prev) => ({
      ...prev,
      files: [
        ...prev.files,
        { ...fileData, id: uid(), uploadedAt: new Date().toISOString() },
      ],
    }));
    showToast("Archivo subido");
  }, [showToast]);

  const deleteFile = useCallback((id) => {
    setData((prev) => ({ ...prev, files: prev.files.filter((f) => f.id !== id) }));
    showToast("Archivo eliminado");
  }, [showToast]);

  const value = useMemo(
    () => ({
      courses: data.courses,
      content: data.content,
      files: data.files,
      toast,
      showToast,
      addCourse,
      updateCourse,
      deleteCourse,
      toggleCourse,
      addClass,
      updateClass,
      deleteClass,
      moveClass,
      updateContent,
      addFile,
      deleteFile,
    }),
    [
      data,
      toast,
      showToast,
      addCourse,
      updateCourse,
      deleteCourse,
      toggleCourse,
      addClass,
      updateClass,
      deleteClass,
      moveClass,
      updateContent,
      addFile,
      deleteFile,
    ]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin debe usarse dentro de AdminProvider");
  return ctx;
};
