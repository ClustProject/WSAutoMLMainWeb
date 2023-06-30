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
import PrivateLayout from "./components/authentication/PrivateLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<PrivateLayout />}>
            <Route index element={<MainPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/metadata/:id' element={<MetadataDetailPage />} />
            <Route path='/model-learning' element={<ModelLearningPage />} />
            <Route path='/model-operation' element={<ModelOperationPage />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
