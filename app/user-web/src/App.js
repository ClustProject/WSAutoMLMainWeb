import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import SearchPage from "./pages/search/SearchPage";
import MetadataDetailPage from "./pages/metadata/MetadataDetailPage";
import ModelLearningPage from "./pages/model-learning/ModelLearningPage";
import ModelOperationPage from "./pages/model-operation/ModelOperationPage";
import NotFound from "./error/NotFound";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./components/authentication/AuthContext";
import PrivateRoute from "./components/authentication/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/loginPage' element={<LoginPage />} />
          <Route
            index
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/search'
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/metadata/:id'
            element={
              <PrivateRoute>
                <MetadataDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/model-learning'
            element={
              <PrivateRoute>
                <ModelLearningPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/model-operation'
            element={
              <PrivateRoute>
                <ModelOperationPage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
